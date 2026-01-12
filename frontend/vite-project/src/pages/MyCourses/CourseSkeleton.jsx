export function CourseSkeleton() {
  return (
    <div className="container py-3">
      {[1, 2, 3].map((i) => (
        <div className="mb-3" key={i}>
          <div
            className="border rounded p-3 d-flex gap-3 align-items-start shadow-sm"
            aria-hidden="true"
          >
            {/* Thumbnail placeholder */}
            <div
              className="placeholder-glow rounded"
              style={{ width: "220px", height: "130px" }}
            >
              <span className="placeholder col-12 h-100 rounded"></span>
            </div>

            {/* Content placeholder */}
            <div className="flex-grow-1">
              <h5 className="placeholder-glow mb-2">
                <span className="placeholder col-6"></span>
              </h5>

              <p className="placeholder-glow mb-2">
                <span className="placeholder col-8"></span>
                <span className="placeholder col-5"></span>
              </p>

              <div className="placeholder-glow mb-3">
                <span className="placeholder col-3 me-2"></span>
                <span className="placeholder col-3 me-2"></span>
                <span className="placeholder col-2"></span>
              </div>

              {/* Progress bar placeholder */}
              <div className="progress placeholder-glow" style={{ height: "6px", maxWidth: "300px" }}>
                <div className="progress-bar placeholder col-12"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
