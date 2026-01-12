// src/pages/Register/Register.jsx  (or wherever your Register component is)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

// IMPORTANT: put your image at src/assets/register.jpg
import illustration from "../../assets/register.jpg";
//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

 function handleSubmit(e) {
  e.preventDefault();

  if (form.password !== form.confirm) {
    alert("Passwords do not match!");
    return;
  }

  axios
    .post(`${backendUrl}/api/auth/register`, {
      name: form.name,
      email: form.email,
      password: form.password,
    })
    .then((res) => {
      console.log("REGISTER SUCCESS:", res.data);
      navigate("/login"); // go to login AFTER successful register
    })
    .catch((err) => {
      console.error("REGISTER ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    });
}

  return (
    <div className="register-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="register-card shadow-lg d-flex flex-column flex-md-row">

        {/* IMAGE SIDE - left on md+ */}
        <div className="register-image-side">
          <div className="register-image-inner">
            <img
              src={illustration}
              alt="Create account"
              onError={(e) => {
                e.currentTarget.onerror = null;
                // small backup inline SVG data URL (guaranteed)
                e.currentTarget.src =
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%238f7ae0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='white'>Register Image</text></svg>";
              }}
            />
          </div>
        </div>

        {/* FORM SIDE - right on md+ */}
        <div className="register-form-side p-4 p-md-5">
          <h3 className="fw-semibold mb-2 text-center text-md-start">Create Account</h3>
          <p className="text-muted small text-center text-md-start mb-4">
            Join Smart LMS and start your learning journey
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Password</label>
              <div className="input-group">
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPwd((s) => !s)}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  name="confirm"
                  className="form-control"
                  placeholder="Confirm password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPwd((s) => !s)}
                >
                  {showConfirmPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="d-grid mt-3">
              <button className="btn btn-primary btn-lg" type="submit">
                Create account
              </button>
            </div>

            <p className="text-center text-md-start mt-3 small mb-0">
              Already have an account?{" "}
              <Link className="fw-semibold" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
