import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import axios from "axios";

import "./styles/form.css";
import "./styles/layout.css";

axios.defaults.withCredentials = true;

function App() {
  const [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/auth/dashboard")
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            auth ? <Navigate to="/dashboard" /> : <Login setAuth={setAuth} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            auth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
