import { Link, useNavigate } from "react-router-dom";

export default function Landing({ token, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>💪 GymLog</h1>
      <p>Track your workouts. Crush your goals.</p>
      {token ? (
        <div>
          <button onClick={() => navigate("/workouts")}>Go to Dashboard</button>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      )}
    </div>
  );
}