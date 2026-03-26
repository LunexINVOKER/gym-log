const client = require("../client");

async function getWorkoutsByUser(userId) {
  const { rows } = await client.query(
    `SELECT * FROM workouts WHERE user_id = $1 ORDER BY date DESC;`,
    [userId]
  );
  return rows;
}

async function getWorkoutById(id) {
  const { rows: [workout] } = await client.query(
    `SELECT * FROM workouts WHERE id = $1;`,
    [id]
  );
  if (!workout) return null;

  const { rows: exercises } = await client.query(
    `SELECT * FROM exercises WHERE workout_id = $1 ORDER BY id;`,
    [id]
  );

  return { ...workout, exercises };
}

async function createWorkout(name, date, userId) {
  const { rows } = await client.query(
    `INSERT INTO workouts (name, date, user_id)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [name, date, userId]
  );
  return rows[0];
}

async function updateWorkout(id, name, date) {
  const { rows } = await client.query(
    `UPDATE workouts
     SET name = COALESCE($2, name),
         date = COALESCE($3, date)
     WHERE id = $1
     RETURNING *;`,
    [id, name, date]
  );
  return rows[0] || null;
}

async function deleteWorkout(id) {
  const { rows } = await client.query(
    `DELETE FROM workouts WHERE id = $1 RETURNING *;`,
    [id]
  );
  return rows[0] || null;
}

module.exports = { getWorkoutsByUser, getWorkoutById, createWorkout, updateWorkout, deleteWorkout };