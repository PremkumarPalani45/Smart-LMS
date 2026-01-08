import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const {user,logout}=useAuth();

  const getDisplayName = (email) => {
  if (!user) return "Guest";   // 🔥 FIX
    return user.split("@")[0];   // only if user exists
};
  return (
   <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">



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
{/* conditional rendering for user login logout */}
{user ? (
  <>
    <li className="nav-item d-flex align-items-center ms-3 me-2">
      <Link to="/profile" className="profile"><div
        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
        style={{ width: "32px", height: "32px", fontSize: "14px" }}
      >
        {getDisplayName(user.email)[0].toUpperCase()}
      </div></Link>
    </li>

    <li className="nav-item">
      <button className="nav-link btn" onClick={logout}>
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li className="nav-item">
      <NavLink className="nav-link" to="/login">Login</NavLink>
    </li>

    <li className="nav-item">
      <NavLink className="nav-link" to="/register">Register</NavLink>
    </li>
  </>
)}


          
          </ul>
        </div>

      </div>
    </nav>
  );
}
