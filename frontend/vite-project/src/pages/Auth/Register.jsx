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

    // simulate success
    navigate("/login");
  }

  return (
    <div className="register-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4 p-md-5 register-card" style={{ maxWidth: 450, width: "100%" }}>
        
        <h3 className="text-center mb-3 fw-semibold">Create an Account</h3>
        <p className="text-center text-muted small mb-4">
          Fill the details to register in Smart LMS
        </p>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label small">Full Name</label>
            <input 
              type="text"
              name="name"
              className="form-control form-control-lg"
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
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
              />
              <button 
                type="button"
                className="btn btn-outline-secondary btn-lg"
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
                className="form-control form-control-lg"
                placeholder="Confirm password"
                value={form.confirm}
                onChange={handleChange}
              />
              <button 
                type="button"
                className="btn btn-outline-secondary btn-lg"
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
              >
                {showConfirmPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="d-grid mt-3">
            <button className="btn btn-primary btn-lg">Register</button>
          </div>

          <p className="text-center mt-3 small">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold">Login</Link>
          </p>

        </form>

      </div>
    </div>
  );
}
