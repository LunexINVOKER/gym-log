const express = require("express");
const cors = require("cors");
const app = express();

const getUserFromToken = require("./middleware/getUserFromToken");
const usersRouter = require("./api/users");
const workoutsRouter = require("./api/workouts");

app.use(cors());
app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/workouts", workoutsRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

module.exports = app;
