import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
//import illustration from "../../assets/login.jpg";

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
    <div className="login-page-wrapper d-flex align-items-center justify-content-center">
      
      <div className="login-card glass-card shadow-lg d-flex flex-column flex-md-row">

       
       {/* IMAGE SIDE */}
<div className="login-image-section d-none d-md-flex">
  <div className="login-image-inner">
    <img
     src={"https://images.unsplash.com/photo-1605902711954-8d9d2a7bd64b?auto=format&fit=crop&w=1000&q=60"}
      alt="Login Illustration"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=1000&q=60";
      }}
    />
    <div className="login-image-overlay" />
  </div>
</div>


        {/* FORM SIDE */}
        <div className="login-form-section p-4 p-md-5">
          <h3 className="fw-bold mb-2 text-center">Welcome Back</h3>
          <p className="text-muted small text-center mb-4">
            Sign in to continue your learning journey
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg rounded-3"
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
                  className="form-control form-control-lg rounded-start-3"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-end-3"
                  onClick={() => setShowPwd((s) => !s)}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn gradient-btn btn-lg rounded-3">
                Sign In
              </button>
            </div>

            <p className="text-center mt-3 small">
              Don’t have an account?{" "}
              <Link to="/register" className="fw-semibold">Register</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
