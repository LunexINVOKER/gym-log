const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { createUser, getUserByUsername } = require("../db/queries/users");
const { createToken } = require("../utils/jwt");
const requireBody = require("../middleware/requireBody");

router.post("/register", requireBody("username", "password"), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existing = await getUserByUsername(username);
    if (existing) return res.status(409).json({ error: "Username already taken" });

    const user = await createUser(username, password);
    const token = createToken({ id: user.id });
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", requireBody("username", "password"), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = createToken({ id: user.id });
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;