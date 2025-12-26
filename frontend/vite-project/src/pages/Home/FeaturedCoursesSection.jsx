// src/pages/Home/FeaturedCoursesSection.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import courseImg1 from "../../public/assets/course1.jpg";
import courseImg2 from "../../assets/course2.jpg";
import courseImg3 from "../../assets/course3.jpg";

export default function FeaturedCoursesSection() {
  const [courses, setCourses] = useState([]);
  const[isloading,setisloading]=useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
       const res = await axios.get("http://localhost:3003/api/courses");

console.log("API response:", res.data);

setCourses(res.data.courses);

      } catch (err) {
        console.error("Error fetching courses:", err);
      }
      finally{
        setisloading(false);
      }
    }

    fetchCourses();
  }, []); // empty array → run once on mount

  if(isloading) return(<p>{"loading..."}</p>)

  return (
    <section className="py-5">
      <div className="container">
        <div className="section-card p-4">

          <h3 className="section-title text-center mb-2">Featured courses</h3>
          <p className="text-muted text-center small mb-4">
            A few good starting points that many students choose first.
          </p>

          <div className="row g-4">
            {courses.map((course) => (
              <div className="col-12 col-md-6 col-lg-4" key={course._id}>
                <Link to={`/courses/${course._id}`} className="course-card-link">
                  <article className="course-card">

                    <div className="course-image-wrapper">
                      <img
                       src={course.image}
                        alt={course.title}
                        className="course-thumb"
                      />

                      <span className="course-category-badge">
                        {course.category?.name || "Category"}
                      </span>
                    </div>

                    <div className="course-card-body">
                      <h5 className="course-title mb-2">{course.title}</h5>

                      <p className="small text-muted mb-1">
                        {course.description} • {course.duration}
                      </p>

                      <p className="small text-muted mb-3">
                        👨‍🎓 {course.studentsEnrolled || 0} students enrolled
                      </p>

                      <div className="course-meta-row">
                        <span className="course-rating">⭐ {course.rating || 4.5}</span>
                        <span className="course-instructor">
                          {course.instructor?.name || "Instructor"}
                        </span>
                      </div>
                    </div>

                  </article>
                </Link>
              </div>
            ))}
          </div>

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
