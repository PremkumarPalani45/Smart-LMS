import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";

export default function SingleCourses() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  //const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = import.meta.env.VITE_API_URL;

  // 🔹 Fetch single course (with isPurchased)
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${backendUrl}/api/courses/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, backendUrl]);

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <p>Loading course...</p>
      </div>
    );
  }

  // 🔹 Course not found
  if (!course) {
    return (
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card text-center shadow-sm border-0 p-4">
              <h3 className="fw-bold text-danger mb-3">
                Course Not Found 🚫
              </h3>

              <p className="text-muted mb-4">
                The course you are looking for does not exist or may have been
                removed. Please check the link or browse our available courses.
              </p>

              <a href="/courses" className="btn btn-primary">
                ← Back to Courses
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Purchase flag from backend
  const isPurchased = course.isPurchased === true;

  return (
    <div className="container mt-5 pt-4">
      <div className="row g-4">

        {/* LEFT – IMAGE */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <img
              src={course.image || "https://via.placeholder.com/600x350"}
              alt={course.title}
              className="img-fluid rounded"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* RIGHT – DETAILS */}
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3">{course.title}</h2>

          <p className="text-muted mb-3">
            {course.description || "No description available for this course."}
          </p>

          <div className="mb-3">
            <span className="badge bg-primary me-2">
              {course.category?.name || "Category"}
            </span>
            <span className="badge bg-secondary">
              {course.duration || "Duration"}
            </span>
          </div>

          <p className="mb-2">
            👨‍🏫 <strong>Instructor:</strong>{" "}
            {course.instructor?.name || "Instructor"}
          </p>

          <p className="mb-2">
            ⭐ <strong>Rating:</strong> {course.rating || 4.5}
          </p>

          <p className="mb-3">
            👨‍🎓 <strong>Students Enrolled:</strong>{" "}
            {course.studentsEnrolled || 0}
          </p>

          {/* PRICE */}
          <h4 className="text-success mb-4">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </h4>

          {/* ACTION BUTTONS (UNCHANGED STYLES) */}
          <div className="d-flex gap-3 align-items-stretch">
            {!isPurchased ? (
              <>
                <button
                  className="btn btn-outline-primary w-50 py-2"
                  onClick={() => addToCart(course._id)}
                >
                  Add to Cart
                </button>

                <Link
                  to="/checkout"
                  className="btn btn-primary w-50 py-2 d-flex align-items-center justify-content-center"
                >
                  Buy Now
                </Link>
              </>
            ) : (
              <Link
                to={`/learning`}
                className="btn btn-success w-100 py-2 d-flex align-items-center justify-content-center"
              >
                Go to Course
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
