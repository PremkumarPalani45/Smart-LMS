// src/pages/Home/FeaturedCoursesSection.jsx
import { Link } from "react-router-dom";

export default function FeaturedCoursesSection({ featuredCourses }) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="section-card p-4">
          {/* Centered title */}
          <h3 className="section-title text-center mb-2">Featured courses</h3>
          <p className="text-muted text-center small mb-4">
            A few good starting points that many students choose first.
          </p>

          <div className="row g-4">
            {featuredCourses.map((course) => (
              <div className="col-12 col-md-6 col-lg-4" key={course.id}>
                <Link
                  to={`/courses/${course.id}`}
                  className="course-card-link"
                >
                  <article className="course-card">
                    {/* IMAGE + CATEGORY BADGE */}
                    <div className="course-image-wrapper">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="course-thumb"
                      />
                      <span className="course-category-badge">
                        {course.category}
                      </span>
                    </div>

                    {/* TEXT BODY */}
                    <div className="course-card-body">
                      <h5 className="course-title mb-2">{course.title}</h5>

                      <p className="small text-muted mb-1">
                        {course.level} • {course.duration}
                      </p>

                      <p className="small text-muted mb-3">
                        👨‍🎓 {course.students.toLocaleString()} students enrolled
                      </p>

                      {/* Bottom row: rating left, instructor right */}
                      <div className="course-meta-row">
                        <span className="course-rating">
                          ⭐ {course.rating.toFixed(1)}
                        </span>
                        <span className="course-instructor">
                          {course.instructor}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>

          {/* Big See all button below cards */}
          <div className="text-center mt-4">
            <Link to="/courses" className="btn btn-outline-primary btn-lg">
              See all courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
