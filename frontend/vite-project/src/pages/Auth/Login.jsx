import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import illustration from "../../assets/login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/courses");
  }

  return (
    <div className="login-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card d-flex flex-column flex-md-row shadow-lg">
        
        {/* IMAGE SIDE (hidden on very small screens if you want) */}
        <div className="login-image-section d-none d-md-flex">
          <img src={illustration} alt="Login Illustration" />
        </div>

        {/* FORM SIDE */}
        <div className="login-form-section p-4 p-md-5">
          <h3 className="fw-semibold mb-2 text-center">Welcome Back</h3>
          <p className="text-muted small text-center mb-4">
            Sign in to continue your learning journey
          </p>

          <form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
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

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>

            <p className="text-center mt-3 small">
              Don't have an account?{" "}
              <Link to="/register" className="fw-semibold">Register</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
