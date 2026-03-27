import ExerciseGuide from "../components/ExerciseGuide";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchWorkout,
  updateWorkout,
  deleteWorkout,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../api/workouts";

export default function WorkoutDetail({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDate, setEditDate] = useState("");
  const [form, setForm] = useState({ name: "", sets: "", reps: "", weight: "" });
  const [editExercise, setEditExercise] = useState(null); // { id, name, sets, reps, weight }
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWorkout();
  }, [id]);

  async function loadWorkout() {
    const data = await fetchWorkout(token, id);
    if (data.id) {
      setWorkout(data);
      setEditName(data.name);
      setEditDate(data.date.slice(0, 10));
    }
  }

  async function handleUpdateWorkout(e) {
    e.preventDefault();
    await updateWorkout(token, id, editName, editDate);
    setEditing(false);
    loadWorkout();
  }

  async function handleDeleteWorkout() {
    await deleteWorkout(token, id);
    navigate("/workouts");
  }

  async function handleAddExercise(e) {
    e.preventDefault();
    const data = await createExercise(token, id, {
      name:   form.name,
      sets:   Number(form.sets),
      reps:   Number(form.reps),
      weight: Number(form.weight),
    });
    if (data.id) {
      setForm({ name: "", sets: "", reps: "", weight: "" });
      loadWorkout();
    } else {
      setError(data.error || "Failed to add exercise");
    }
  }

  async function handleUpdateExercise(e) {
    e.preventDefault();
    await updateExercise(token, id, editExercise.id, {
      name:   editExercise.name,
      sets:   Number(editExercise.sets),
      reps:   Number(editExercise.reps),
      weight: Number(editExercise.weight),
    });
    setEditExercise(null);
    loadWorkout();
  }



  if (!workout) return <p>Loading...</p>;

  return (
    <div className="workout-detail">
      <button onClick={() => navigate("/workouts")}>← Back</button>

      {editing ? (
        <form onSubmit={handleUpdateWorkout}>
          <input value={editName} onChange={e => setEditName(e.target.value)} required />
          <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} required />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="workout-header">
          <h2>{workout.name}</h2>
          <p>{workout.date.slice(0, 10)}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDeleteWorkout}>Delete Workout</button>
        </div>
      )}

      <h3>Exercises</h3>
      {error && <p className="error">{error}</p>}

      <ul className="exercise-list">
        {workout.exercises.map(ex => (
          <li key={ex.id} className="exercise-item">
            {editExercise?.id === ex.id ? (
              <form onSubmit={handleUpdateExercise}>
                <input value={editExercise.name}   onChange={e => setEditExercise({ ...editExercise, name: e.target.value })} />
                <input type="number" value={editExercise.sets}   onChange={e => setEditExercise({ ...editExercise, sets: e.target.value })} />
                <input type="number" value={editExercise.reps}   onChange={e => setEditExercise({ ...editExercise, reps: e.target.value })} />
                <input type="number" value={editExercise.weight} onChange={e => setEditExercise({ ...editExercise, weight: e.target.value })} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditExercise(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <span>
                  <strong>{ex.name}</strong> — {ex.sets} sets × {ex.reps} reps @ {ex.weight} kg
                  <ExerciseGuide exerciseName={ex.name} />
                </span>
                <button onClick={() => setEditExercise(ex)}>Edit</button>
                <button onClick={() => handleDeleteExercise(ex.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Add Exercise</h3>
      <form onSubmit={handleAddExercise} className="exercise-form">
        <input
          placeholder="Exercise name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number" placeholder="Sets"
          value={form.sets}
          onChange={e => setForm({ ...form, sets: e.target.value })}
          required
        />
        <input
          type="number" placeholder="Reps"
          value={form.reps}
          onChange={e => setForm({ ...form, reps: e.target.value })}
          required
        />
        <input
          type="number" placeholder="Weight (kg)"
          value={form.weight}
          onChange={e => setForm({ ...form, weight: e.target.value })}
          required
        />
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
}

