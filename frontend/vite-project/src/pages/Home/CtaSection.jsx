import { Link } from "react-router-dom";

export default function CtaSection() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <section className="cta-modern">
      <div className="container text-center cta-content">
        <h2 className="cta-title">Ready to Start Learning?</h2>

        <p className="cta-subtitle">
          Join thousands of learners and upskill yourself with Smart LMS today.
        </p>

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="btn btn-light btn-lg fw-semibold cta-btn"
          >
            Get Started Now
          </Link>
        ) : (
          <Link
            to="/learning"
            className="btn btn-light btn-lg fw-semibold cta-btn"
          >
            Continue Learning
          </Link>
        )}
      </div>
    </section>
  );
}
