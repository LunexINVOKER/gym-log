import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWorkouts, createWorkout, deleteWorkout } from "../api/workouts";

export default function Workouts({ token, onLogout }) {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function loadWorkouts() {
    const data = await fetchWorkouts(token);
    if (Array.isArray(data)) setWorkouts(data);
  }

  async function handleCreate(e) {
    e.preventDefault();
    const data = await createWorkout(token, name, date);
    if (data.id) {
      setName("");
      setDate("");
      loadWorkouts();
    } else {
      setError(data.error || "Failed to create workout");
    }
  }

  async function handleDelete(id) {
    await deleteWorkout(token, id);
    loadWorkouts();
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Workouts</h2>
        <button onClick={onLogout}>Logout</button>
      </div>

      <form onSubmit={handleCreate} className="new-workout-form">
        <input
          placeholder="Workout name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <button type="submit">+ New Workout</button>
      </form>
      {error && <p className="error">{error}</p>}

      {workouts.length === 0 ? (
        <p>No workouts yet. Create one above!</p>
      ) : (
        <ul className="workout-list">
          {workouts.map(w => (
            <li key={w.id} className="workout-item">
              <span onClick={() => navigate(`/workouts/${w.id}`)}>
                <strong>{w.name}</strong> — {w.date.slice(0, 10)}
              </span>
              <button onClick={() => handleDelete(w.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}