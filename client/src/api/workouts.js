const API = import.meta.env.VITE_API_URL || "";
const BASE = `${API}/workouts`;

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchWorkouts(token) {
  const res = await fetch(BASE, { headers: authHeaders(token) });
  return res.json();
}

export async function fetchWorkout(token, id) {
  const res = await fetch(`${BASE}/${id}`, { headers: authHeaders(token) });
  return res.json();
}

export async function createWorkout(token, name, date) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ name, date }),
  });
  return res.json();
}

export async function updateWorkout(token, id, name, date) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ name, date }),
  });
  return res.json();
}

export async function deleteWorkout(token, id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
}

export async function createExercise(token, workoutId, data) {
  const res = await fetch(`${BASE}/${workoutId}/exercises`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateExercise(token, workoutId, eid, data) {
  const res = await fetch(`${BASE}/${workoutId}/exercises/${eid}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteExercise(token, workoutId, eid) {
  const res = await fetch(`${BASE}/${workoutId}/exercises/${eid}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
}