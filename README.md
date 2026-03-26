# GymLog

A personal workout tracking web application that allows users to log, manage, and monitor their fitness progress.

## Features

- **User Authentication** — Secure registration and login with JWT-based sessions and bcrypt password hashing
- **Workout Management** — Create, view, edit, and delete workouts with a name and date
- **Exercise Tracking** — Add exercises to any workout with sets, reps, and weight
- **Protected Routes** — All workout and exercise data is private; users can only access their own data
- **Ownership Validation** — Server enforces that users cannot read or modify another user's workouts
