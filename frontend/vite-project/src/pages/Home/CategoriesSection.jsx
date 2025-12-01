// src/pages/Home/CategoriesSection.jsx

export default function CategoriesSection({ categories }) {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="section-card p-4 mb-4">
          <h3 className="section-title text-center mb-3">Browse categories</h3>
          <p className="text-muted text-center small mb-4">
            Start with a category that matches what you want to improve.
          </p>

          <div className="row g-3">
            {categories.map((cat, index) => (
              <div className="col-12 col-sm-6 col-lg-3" key={index}>
                <div className="category-card h-100">
                  <div className="category-emoji">{cat.emoji}</div>
                  <h6 className="mb-1">{cat.name}</h6>
                  <p className="small text-muted mb-0">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
