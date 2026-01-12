import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";



//const API = import.meta.env.VITE_BACKEND_URL + "/api";
//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = import.meta.env.VITE_API_URL + "/api";
export default function Navbar() {
  const { user, logout ,authLoading } = useAuth();
  //const [cartCount, setCartCount] = useState(0);
const { cartCount } = useCart();
  const getInitial = (email) => {
    if (!email) return "G";
    return email[0].toUpperCase();
  };

  // 🔹 Fetch cart count
// useEffect(() => {
//   if (authLoading) return;
//   if (!user) return;

//   const token = localStorage.getItem("token");
//   if (!token) return;

//   axios
//     .get(`${API}/cart`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       setCartCount(res.data.items?.length || 0);
//     })
//     .catch((err) => {
//   if (err.response?.status === 401) {
//     console.log("Token invalid, logging out");
//     logout(); // optional but recommended
//   }
//   setCartCount(0);
// });
// }, [user, authLoading]); // ✅ FIX


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">

        {/* Brand */}
        <NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="LMS Logo"
            width="34"
            className="me-2"
          />
          <span className="text-primary">Smart LMS</span>
        </NavLink>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <NavLink className="nav-link nav-modern" end to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link nav-modern" to="/courses">
                Courses
              </NavLink>
            </li>

            {user && (
              <li className="nav-item">
                <NavLink className="nav-link nav-modern" to="/learning">
                  My Classroom
                </NavLink>
              </li>
            )}

            {/* RIGHT SIDE – CART + AVATAR + LOGOUT */}
            {user ? (
              <>
                {/* CART ICON */}
                <li className="nav-item ms-lg-3 d-flex align-items-center">
                  <Link to="/cart" className="position-relative nav-link p-0">
                    <span style={{ fontSize: "1.3rem" }}>🛒</span>

                    {cartCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>

                {/* USER AVATAR */}
                <li className="nav-item ms-3 d-flex align-items-center">
                  <Link to="/profile" className="text-decoration-none">
                    <div
                      className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white fw-semibold"
                      style={{ width: "38px", height: "38px" }}
                    >
                      {getInitial(user.email)}
                    </div>
                  </Link>
                </li>

                {/* LOGOUT */}
                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-3">
                <NavLink to="/login" className="nav-link p-0">
                  <button className="login-btn">Login</button>
                </NavLink>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
