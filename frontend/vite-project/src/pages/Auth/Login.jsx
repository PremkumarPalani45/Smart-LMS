import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import illutration from "../../assets/login.jpg"

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
    // dummy login success — redirect to courses
    navigate("/courses");
  }

  return (
    <div className="login-wrapper d-flex min-vh-100">
      <div className="container-fluid">
        <div className="row min-vh-100">

          {/* LEFT SIDE — Illustration */}
          <div className="col-lg-6 d-none d-lg-flex illustration-section align-items-center justify-content-center">
            <div className="text-center px-4">
              <h2 className="text-white mb-3 fw-bold">Welcome Back!</h2>
              <p className="text-white-50 mb-4">
                Continue your learning journey with Smart LMS.
              </p>

              {/* FREE SVG Illustration */}
              <img
                src={illutration}
                alt="learning illustration"
                className="img-fluid"
                style={{ maxHeight: "330px" }}
              />
            </div>
          </div>

          {/* RIGHT SIDE — Login Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="login-card shadow-sm p-4 p-md-5 w-100" style={{ maxWidth: 420 }}>
              <h3 className="mb-2 fw-semibold text-center">Sign In</h3>
              <p className="text-muted small text-center mb-4">
                Enter your credentials to access Smart LMS
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
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
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg"
                      onClick={() => setShowPwd((s) => !s)}
                    >
                      {showPwd ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sign In
                  </button>
                </div>

                <p className="mt-3 text-center mb-0 small">
                  Don't have an account?{" "}
                  <Link to="/register" className="fw-semibold">Register</Link>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
