export default function Footer() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <footer className="footer bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">About Smart LMS</h5>
            <p className="small text-white-50 mt-3">
              Smart LMS is an online learning platform designed to help students
              access courses, track progress, and learn efficiently from anywhere.
              We aim to provide high-quality learning experiences to everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled mt-3">
              <li>
                <a href="/" className="footer-link">Home</a>
              </li>
              <li>
                <a href="/courses" className="footer-link">Courses</a>
              </li>

              {!isLoggedIn ? (
                <>
                  <li>
                    <a href="/login" className="footer-link">Login</a>
                  </li>
                  <li>
                    <a href="/register" className="footer-link">Register</a>
                  </li>
                </>
              ) : (
                <li>
                  <a href="/learning" className="footer-link">My Learning</a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <ul className="list-unstyled mt-3 text-white-50 small">
              <li className="mb-2">📍 123 Learning Street, Chennai, India</li>
              <li className="mb-2">📞 +91 98765 43210</li>
              <li className="mb-2">✉️ support@smartlms.com</li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center small text-white-50 mt-3">
          © {new Date().getFullYear()} Smart LMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
