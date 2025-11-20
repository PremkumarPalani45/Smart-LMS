import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">

        {/* Brand */}
        <NavLink className="navbar-brand fw-bold text-primary" to="/">
      <img 
            src="https://cdn-icons-png.flaticon.com/512/2995/2995620.png"
            alt="Smart LMS Logo"
            className="brand-icon me-2"
          />
          Smart LMS
        </NavLink>

        {/* Mobile Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

         <li className="nav-item">
  <NavLink className="nav-link" end to="/">Home</NavLink>
</li>

<li className="nav-item">
  <NavLink className="nav-link" to="/courses">Courses</NavLink>
</li>

<li className="nav-item">
  <NavLink className="nav-link" to="/login">Login</NavLink>
</li>

<li className="nav-item">
  <NavLink className="nav-link" to="/register">Register</NavLink>
</li>


          
          </ul>
        </div>

      </div>
    </nav>
  );
}
