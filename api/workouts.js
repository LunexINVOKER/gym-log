const express = require("express");
const router = express.Router();
const requireUser = require("../middleware/requireUser");
const requireBody = require("../middleware/requireBody");
const { getWorkoutsByUser, getWorkoutById, createWorkout, updateWorkout, deleteWorkout } = require("../db/queries/workouts");
const { createExercise, updateExercise, deleteExercise, getExerciseById } = require("../db/queries/exercises");

async function checkOwnership(req, res) {
  const workout = await getWorkoutById(req.params.id);
  if (!workout) { res.status(404).json({ error: "Workout not found" }); return null; }
  if (workout.user_id !== req.user.id) { res.status(403).json({ error: "Forbidden" }); return null; }
  return workout;
}

router.get("/", requireUser, async (req, res, next) => {
  try {
    const workouts = await getWorkoutsByUser(req.user.id);
    res.json(workouts);
  } catch (err) { next(err); }
});

router.post("/", requireUser, requireBody("name", "date"), async (req, res, next) => {
  try {
    const { name, date } = req.body;
    const workout = await createWorkout(name, date, req.user.id);
    res.status(201).json(workout);
  } catch (err) { next(err); }
});

router.get("/:id", requireUser, async (req, res, next) => {
  try {
    const workout = await checkOwnership(req, res);
    if (!workout) return;
    res.json(workout);
  } catch (err) { next(err); }
});

router.put("/:id", requireUser, async (req, res, next) => {
  try {
    const existing = await checkOwnership(req, res);
    if (!existing) return;
    const { name, date } = req.body;
    const updated = await updateWorkout(req.params.id, name, date);
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const existing = await checkOwnership(req, res);
    if (!existing) return;
    await deleteWorkout(req.params.id);
    res.json({ message: "Workout deleted successfully" });
  } catch (err) { next(err); }
});

router.post("/:id/exercises", requireUser, requireBody("name", "sets", "reps", "weight"), async (req, res, next) => {
  try {
    const workout = await checkOwnership(req, res);
    if (!workout) return;
    const { name, sets, reps, weight } = req.body;
    const exercise = await createExercise(name, sets, reps, weight, workout.id);
    res.status(201).json(exercise);
  } catch (err) { next(err); }
});

router.put("/:id/exercises/:eid", requireUser, async (req, res, next) => {
  try {
    const workout = await checkOwnership(req, res);
    if (!workout) return;
    const exercise = await getExerciseById(req.params.eid);
    if (!exercise || exercise.workout_id !== workout.id) return res.status(404).json({ error: "Exercise not found" });
    const { name, sets, reps, weight } = req.body;
    const updated = await updateExercise(req.params.eid, name, sets, reps, weight);
    res.json(updated);
  } catch (err) { next(err); }
});

router.delete("/:id/exercises/:eid", requireUser, async (req, res, next) => {
  try {
    const workout = await checkOwnership(req, res);
    if (!workout) return;
    const exercise = await getExerciseById(req.params.eid);
    if (!exercise || exercise.workout_id !== workout.id) return res.status(404).json({ error: "Exercise not found" });
    await deleteExercise(req.params.eid);
    res.json({ message: "Exercise deleted successfully" });
  } catch (err) { next(err); }
});

module.exports = router;
