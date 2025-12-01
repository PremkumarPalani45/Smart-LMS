import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
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
    navigate("/login");
  }

  return (
    <div className="register-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="register-card shadow-lg p-4 p-md-5">

        <h3 className="fw-semibold mb-2 text-center">Create Account</h3>
        <p className="text-muted small text-center mb-4">
          Join Smart LMS and begin your learning journey
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
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPwd(!showPwd)}
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
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
              >
                {showConfirmPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="d-grid mt-3">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>

          <p className="text-center mt-3 small mb-0">
            Already have an account?{" "}
            <Link className="fw-semibold" to="/login">Login</Link>
          </p>

        </form>

      </div>
    </div>
  );
}
