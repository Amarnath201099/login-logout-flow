import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function Dashboard({ setAuth }) {
  const handleLogout = () => {
    axios.post(`${API_BASE_URL}/auth/logout`).then(() => setAuth(false));
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="heading">Klickks</h1>
      <h2>Welcome to the Dashboard</h2>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
