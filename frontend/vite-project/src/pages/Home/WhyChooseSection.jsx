// src/pages/Home/WhyChooseSection.jsx

export default function WhyChooseSection() {
  return (
    <section className="why-section py-5">
      <div className="container text-center">
        <h3 className="why-title mb-4">Why Choose Smart LMS?</h3>

        <div className="row g-4 justify-content-center">
          {/* Feature 1 */}
          <div className="col-12 col-md-4">
            <div className="why-card">
              <div className="why-icon mb-3">
                <i className="bi bi-laptop"></i>
              </div>
              <h5 className="fw-semibold">Accessible Anywhere</h5>
              <p className="text-muted small">
                Learn at your own pace on desktop, tablet or mobile without
                limitations.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="col-12 col-md-4">
            <div className="why-card">
              <div className="why-icon mb-3">
                <i className="bi bi-people"></i>
              </div>
              <h5 className="fw-semibold">Expert Instructors</h5>
              <p className="text-muted small">
                Courses designed and taught by industry experts with real
                experience.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="col-12 col-md-4">
            <div className="why-card">
              <div className="why-icon mb-3">
                <i className="bi bi-award"></i>
              </div>
              <h5 className="fw-semibold">Certification</h5>
              <p className="text-muted small">
                Earn verified certificates to showcase your achievements and
                skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
