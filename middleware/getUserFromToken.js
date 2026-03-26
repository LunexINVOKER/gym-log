const { verifyToken } = require("../utils/jwt");
const { getUserById } = require("../db/queries/users");

async function getUserFromToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.slice(7);

  try {
    const { id } = verifyToken(token);
    req.user = await getUserById(id);
  } catch {
    req.user = null;
  }

  next();
}

module.exports = getUserFromToken;