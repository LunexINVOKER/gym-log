const client = require("./client");
const bcrypt = require("bcrypt");

async function seed() {
  await client.connect();
  console.log("Connected to DB");

  await client.query(`TRUNCATE exercises, workouts, users RESTART IDENTITY CASCADE;`);

  const hash1 = await bcrypt.hash("password123", 10);
  const hash2 = await bcrypt.hash("qwerty456", 10);

  const { rows: users } = await client.query(`
    INSERT INTO users (username, password) VALUES
      ('alex_lifts', $1),
      ('maria_fit', $2)
    RETURNING id, username;
  `, [hash1, hash2]);

  console.log("Users seeded:", users.map(u => u.username));

  const { rows: workouts } = await client.query(`
    INSERT INTO workouts (name, date, user_id) VALUES
      ('Chest Day', '2025-03-10', $1),
      ('Leg Day',   '2025-03-12', $1),
      ('Full Body', '2025-03-15', $2)
    RETURNING id, name;
  `, [users[0].id, users[1].id]);

  console.log("Workouts seeded:", workouts.map(w => w.name));

  await client.query(`
    INSERT INTO exercises (name, sets, reps, weight, workout_id) VALUES
      ('Bench Press', 4, 8,  80.0,  $1),
      ('Incline DB',  3, 10, 30.0,  $1),
      ('Squat',       5, 5,  100.0, $2),
      ('Leg Press',   4, 12, 150.0, $2),
      ('Deadlift',    4, 6,  120.0, $3),
      ('Pull-up',     3, 10, 0.0,   $3);
  `, [workouts[0].id, workouts[1].id, workouts[2].id]);

  console.log("Exercises seeded");
  await client.end();
  console.log("Done!");
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});