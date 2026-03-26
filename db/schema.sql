DROP DATABASE IF EXISTS gymlog;
CREATE DATABASE gymlog;
\c gymlog

CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE workouts (
  id      SERIAL PRIMARY KEY,
  name    TEXT NOT NULL,
  date    DATE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE exercises (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  sets       INTEGER NOT NULL,
  reps       INTEGER NOT NULL,
  weight     DECIMAL NOT NULL,
  workout_id INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE
);