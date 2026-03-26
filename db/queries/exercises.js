const client = require("../client");

async function createExercise(name, sets, reps, weight, workoutId) {
  const { rows } = await client.query(
    `INSERT INTO exercises (name, sets, reps, weight, workout_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *;`,
    [name, sets, reps, weight, workoutId]
  );
  return rows[0];
}

async function updateExercise(eid, name, sets, reps, weight) {
  const { rows } = await client.query(
    `UPDATE exercises
     SET name   = COALESCE($2, name),
         sets   = COALESCE($3, sets),
         reps   = COALESCE($4, reps),
         weight = COALESCE($5, weight)
     WHERE id = $1
     RETURNING *;`,
    [eid, name, sets, reps, weight]
  );
  return rows[0] || null;
}

async function deleteExercise(eid) {
  const { rows } = await client.query(
    `DELETE FROM exercises WHERE id = $1 RETURNING *;`,
    [eid]
  );
  return rows[0] || null;
}

async function getExerciseById(eid) {
  const { rows } = await client.query(
    `SELECT * FROM exercises WHERE id = $1;`,
    [eid]
  );
  return rows[0] || null;
}

module.exports = { createExercise, updateExercise, deleteExercise, getExerciseById };