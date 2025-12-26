import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:3003/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [instructor, setInstructor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(300); // ✅ numeric range

  // 🔹 Fetch categories & instructors (ONCE)
  useEffect(() => {
    fetch(`${API}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data.categories || []));

    fetch(`${API}/instructors`)
      .then(res => res.json())
      .then(data => setInstructors(data.instructors || []));
  }, []);

  // 🔹 Fetch courses (filter-driven)
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category !== "All") params.append("category", category);
    if (instructor !== "All") params.append("instructor", instructor);
    if (maxPrice < 300) params.append("maxPrice", maxPrice);

    setLoading(true);

    fetch(`${API}/courses?${params.toString()}`, { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, category, instructor, maxPrice]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">

        {/* ================= FILTERS ================= */}
        <div className="col-lg-3">
          <div className="bg-white p-3 border-end position-sticky top-0">

            <h6 className="fw-semibold mb-3">Filters</h6>

            {/* PRICE */}
            <div className="mb-4">
              <p className="fw-semibold mb-2">Price</p>

              <input
                type="range"
                className="form-range"
                min="0"
                max="300"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />

              <div className="d-flex justify-content-between small text-muted">
                <span>₹0</span>
                <span>₹100</span>
                <span>₹200</span>
                <span>₹300+</span>
              </div>

              <p className="mt-2 small">
                Selected:{" "}
                <strong>
                  {maxPrice === 300 ? "All Prices" : `Up to ₹${maxPrice}`}
                </strong>
              </p>
            </div>

            <hr />

            {/* CATEGORY */}
            <div className="mb-4">
              <p className="fw-semibold mb-2">Category</p>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoryFilter"
                  checked={category === "All"}
                  onChange={() => setCategory("All")}
                />
                <label className="form-check-label">All</label>
              </div>

              <div className="overflow-auto" style={{ maxHeight: "180px" }}>
                {categories.map(cat => (
                  <div className="form-check mb-2" key={cat._id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="categoryFilter"
                      checked={category === cat._id}
                      onChange={() => setCategory(cat._id)}
                    />
                    <label className="form-check-label">
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            {/* INSTRUCTOR */}
            <div>
              <p className="fw-semibold mb-2">Instructor</p>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="instructorFilter"
                  checked={instructor === "All"}
                  onChange={() => setInstructor("All")}
                />
                <label className="form-check-label">All</label>
              </div>

              <div className="overflow-auto" style={{ maxHeight: "180px" }}>
                {instructors.map(inst => (
                  <div className="form-check mb-2" key={inst._id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="instructorFilter"
                      checked={instructor === inst._id}
                      onChange={() => setInstructor(inst._id)}
                    />
                    <label className="form-check-label">
                      {inst.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================= COURSES ================= */}
        <div className="col-lg-9">
          <input
            className="form-control mb-4"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="row g-4">
            {courses.length === 0 ? (
              <p className="text-muted text-center">No courses found</p>
            ) : (
              courses.map(course => (
                <div key={course._id} className="col-md-6 col-lg-4">
                  <Link
                    to={`/courses/${course._id}`}
                    className="text-dark text-decoration-none"
                  >
                    <div className="card h-100 shadow-sm">
                      <img
                        src={course.image || "https://via.placeholder.com/400x200"}
                        className="card-img-top"
                        style={{ height: 160, objectFit: "cover" }}
                        alt={course.title}
                      />
                      <div className="card-body">
                        <h6 className="mb-1">{course.title}</h6>
                        <small className="text-muted">
                          {course.instructor?.name}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
