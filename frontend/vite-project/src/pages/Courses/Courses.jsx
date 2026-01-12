import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = import.meta.env.VITE_API_URL;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(300);
  const [sort, setSort] = useState("latest");
  const [minRating, setMinRating] = useState(0);

  // 🔹 Fetch categories (from MongoDB)
  useEffect(() => {
    fetch(`${API}/api/category`)
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  // 🔹 Fetch courses (filter + sort driven)
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category !== "All") params.append("category", category);
    if (maxPrice < 300) params.append("maxPrice", maxPrice);
    if (sort) params.append("sort", sort);
    if (minRating > 0) params.append("minRating", minRating);


    setLoading(true);

    fetch(`${backendUrl}/api/courses?${params.toString()}`, { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
      console.log("Fetching courses with:", params.toString());

  }, [search, category, maxPrice, sort,minRating]);

  return (
    <div className="container-fluid pt-5 mt-4">

      <div className="row">

        {/* ================= LEFT FILTERS ================= */}
        <div className="col-lg-3 mb-4">
          <div className="bg-white p-4 border rounded-4 shadow-sm position-sticky top-0">

            <h5 className="fw-bold mb-4">Filter Courses</h5>

            {/* SEARCH */}
            <div className="mb-4">
              <label className="fw-semibold mb-2">Search</label>
              <input
                className="form-control"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* CATEGORY */}
            <div className="mb-4">
              <label className="fw-semibold mb-2">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICE */}
            <div>
              <label className="fw-semibold mb-2">Price</label>

              <input
                type="range"
                className="form-range"
                min="0"
                max="300"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />

              <div className="d-flex justify-content-between small text-muted">
                <span>$0</span>
                <span>$150</span>
                <span>$300</span>
              </div>

              <div className="mt-2 fw-semibold small">
  {maxPrice === 300 ? "All Prices" : `Up to ₹${maxPrice}`}
</div>
            </div>

            <div className="mt-4">
  <label className="fw-semibold mb-2">Minimum Rating</label>

  <select
    className="form-select"
    value={minRating}
    onChange={(e) => setMinRating(Number(e.target.value))}
  >
    <option value={0}>All Ratings</option>
    <option value={5}>★★★★★ 5</option>
    <option value={4}>★★★★☆ 4+</option>
    <option value={3}>★★★☆☆ 3+</option>
    <option value={2}>★★☆☆☆ 2+</option>
    <option value={1}>★☆☆☆☆ 1+</option>
  </select>
</div>

          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="col-lg-9">

          {/* SORT + COUNT */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

            <p className="mb-0 text-muted">
              Showing <strong>{courses.length}</strong> courses
            </p>

            <select
              className="form-select w-auto"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">Newest</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="title">Title (A–Z)</option>
              <option value="rating">Highest Rated</option>
            </select>

          </div>

          {/* COURSES GRID */}
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div className="row g-4">
             {courses.length === 0 ? (
  <div className="col-12 text-center py-5">
    <h5 className="fw-semibold mb-2">No courses available yet 📚</h5>
    <p className="text-muted">
      We’re preparing high-quality courses. Please check back soon!
    </p>
  </div>
              ) : (
                courses.map(course => (
                  <div key={course._id} className="col-sm-6 col-lg-4">
                    <Link
                      to={`/courses/${course._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="card h-100 border-0 shadow-sm rounded-4">

                        <img
                          src={course.image || "https://via.placeholder.com/400x200"}
                          className="card-img-top rounded-top-4"
                          style={{ height: 180, objectFit: "cover" }}
                          alt={course.title}
                        />

                        <div className="card-body d-flex flex-column">
                          <h6 className="fw-semibold mb-1">
                            {course.title}
                          </h6>

                          <small className="text-muted mb-2">
                            {course.category?.name}
                          </small>

                          {/* RATING STARS */}
<div className="mb-2">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={
        star <= course.rating
          ? "text-warning"
          : "text-secondary"
      }
    >
      ★
    </span>
  ))}
  <span className="small text-muted ms-1">
    ({course.rating})
  </span>
</div>

                          <div className="mt-auto fw-bold text-primary">
                            {course.price === 0 ? "Free" : `$${course.price}`}
                          </div>
                        </div>

                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
