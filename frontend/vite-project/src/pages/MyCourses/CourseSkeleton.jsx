export function CourseSkeleton() {
  return (
    <div className="row">
      {[1, 2, 3].map((i) => (
        <div className="col-md-4 mb-4" key={i}>
          <div className="card" aria-hidden="true">
            <div
              className="placeholder-glow"
              style={{ height: "160px" }}
            >
              <span className="placeholder col-12 h-100"></span>
            </div>

            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>

              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
              </p>

              <a className="btn btn-primary disabled placeholder col-6"></a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
