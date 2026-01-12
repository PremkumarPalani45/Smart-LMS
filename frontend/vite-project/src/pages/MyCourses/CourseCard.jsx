import { Link } from "react-router-dom";

const DEFAULT_THUMBNAIL =
  "https://via.placeholder.com/300x180?text=Course+Thumbnail";

export function CourseCard({ course }) {
  const hasProgress = (course.progress || 0) > 0;

  return (
    <div className="border rounded p-3 mb-3 w-100 d-flex gap-3 align-items-start shadow-sm">

      {/* LEFT: Thumbnail */}
      <img
        src={course.image}
        alt={course.title}
        className="rounded"
        style={{ width: "220px", height: "130px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_THUMBNAIL;
        }}
      />

      {/* RIGHT: Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <div>
          <h5 className="mb-1">{course.title}</h5>

          <p className="text-muted mb-2">
            {course.description}
          </p>

          {/* Extra details */}
          <div className="small text-muted mb-2">
            <span className="me-3">👨‍🏫 {course.instructor || "Admin"}</span>
            <span className="me-3">📚 {course.level || "Beginner"}</span>
            <span>⏱ {course.duration || "8+ hrs"}</span>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="d-flex align-items-center justify-content-between mt-auto">
          {/* Progress */}
          <div className="progress" style={{ height: "6px", width: "220px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${course.progress || 0}%` }}
              aria-valuenow={course.progress || 0}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          {/* CTA Button */}
          <Link to={`/learning/${course._id}`}>
            <button className="btn btn-primary btn-sm ms-3">
              {hasProgress ? "Continue Learning" : "Start Learning"}
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}
