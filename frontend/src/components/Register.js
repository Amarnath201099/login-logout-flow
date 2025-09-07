import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post(`${API_BASE_URL}/auth/register`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        alert(res.data.message);
        setFormData({ email: "", password: "", confirmPassword: "" });
        setErrors({});
      })
      .catch((err) =>
        setErrors({
          form: err.response?.data?.message || "Registration failed",
        })
      );
  };

  return (
    <div className="form-container">
      <h1 className="heading">Klickks</h1>
      <form onSubmit={handleSubmit} className="form">
        <h2>Register</h2>

        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="input-error">{errors.email}</div>}
        </div>
        <div>
          <div className="form-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span onClick={togglePassword} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <div className="input-error">{errors.password}</div>
          )}
        </div>
        <div>
          <div className="form-field password-field">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span onClick={toggleConfirm} className="eye-icon">
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <div className="input-error">{errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Sign Up
        </button>
        {errors.form && <div className="form-error">{errors.form}</div>}
        <p className="text-small">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
