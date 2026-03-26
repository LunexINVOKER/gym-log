import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workouts from "./pages/Workouts";
import WorkoutDetail from "./pages/WorkoutDetail";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  function handleLogin(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <Routes>
      <Route path="/" element={<Landing token={token} onLogout={handleLogout} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onLogin={handleLogin} />} />
      <Route
        path="/workouts"
        element={token ? <Workouts token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
      />
      <Route
        path="/workouts/:id"
        element={token ? <WorkoutDetail token={token} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}