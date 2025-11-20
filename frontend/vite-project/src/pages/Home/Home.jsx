export default function Home() {
  return (
    <div className="container py-4">
      <h1 className="mb-3">Welcome to Smart LMS</h1>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Featured course</h5>
              <p className="card-text">Build modern web apps with React and Vite.</p>
              <a href="/courses" className="btn btn-primary">Explore</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
