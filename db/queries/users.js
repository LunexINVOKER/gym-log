const client = require("../client");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function createUser(username, password) {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const { rows } = await client.query(
    `INSERT INTO users (username, password)
     VALUES ($1, $2)
     RETURNING id, username;`,
    [username, hashed]
  );
  return rows[0];
}

async function getUserByUsername(username) {
  const { rows } = await client.query(
    `SELECT * FROM users WHERE username = $1;`,
    [username]
  );
  return rows[0] || null;
}

async function getUserById(id) {
  const { rows } = await client.query(
    `SELECT id, username FROM users WHERE id = $1;`,
    [id]
  );
  return rows[0] || null;
}

module.exports = { createUser, getUserByUsername, getUserById };