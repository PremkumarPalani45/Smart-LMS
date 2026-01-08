import { Link } from "react-router-dom";

export function CourseCard({ course }) {
  return (
    <div className="card h-100 shadow-sm">
      <Link
        to={`/learning/${course._id}`}
        className="text-decoration-none text-dark"
      >
        <img
          src={course.thumbnail}
          className="card-img-top"
          alt={course.title}
          style={{ height: "160px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text text-muted">
            {course.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
