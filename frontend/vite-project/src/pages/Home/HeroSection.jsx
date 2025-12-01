// src/pages/Home/HeroSection.jsx
import { Link } from "react-router-dom";
import illustration from "../../assets/hero.jpg";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container py-5">
        <div className="row align-items-center g-4">
          {/* LEFT SIDE TEXT */}
          <div className="col-md-7 text-white">
            <span className="hero-label">Welcome to Smart LMS</span>
            <h1 className="hero-title mt-2">
              Learn skills that actually help you grow.
            </h1>
            <p className="hero-subtitle mt-3">
              Simple, structured courses with progress tracking. Study at your own
              pace and build real projects that improve your career.
            </p>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <Link to="/register" className="btn btn-outline-light btn-lg">
                Get Started
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="col-md-5 text-center">
            <img
              src={illustration}
              className="hero-img"
              alt="Learning Illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
