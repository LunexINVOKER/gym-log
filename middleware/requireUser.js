function requireUser(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized — please log in" });
  }
  next();
}

module.exports = requireUser;