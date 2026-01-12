import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = import.meta.env.VITE_API_URL;

export default function LearnCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/courses/${courseId}`
        );
        setCourse(res.data);
        const firstLesson =
  res.data?.modules?.[0]?.lessons?.[0];

if (firstLesson) {
  setSelectedLesson(firstLesson);
}
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [courseId]);

  // 🔥 GUARD: prevent map on undefined
  if (!course) {
    return (
      <div className="container py-5 text-center">
        <h5>Loading course...</h5>
      </div>
    );
  }

  return (
  <div className="container-fluid py-3">
    <div className="row">

      {/* LEFT SIDE - MODULES & LESSONS */}
      <div className="col-md-4 border-end">
        <h4 className="mb-3">{course.title}</h4>

        {course.modules?.length === 0 && (
          <p className="text-muted">No modules added yet.</p>
        )}

        {course.modules?.map((module, index) => (
          <div key={index} className="mb-3">
            <h6 className="fw-semibold">{module.title}</h6>

            <ul className="list-group list-group-flush">
              {module.lessons?.map((lesson, i) => (
                <li
                  key={i}
                  className={`list-group-item px-0 ${
                    selectedLesson?._id === lesson._id
                      ? "fw-bold text-primary"
                      : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  ▶ {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - VIDEO */}
      <div className="col-md-8">
        <div className="ratio ratio-16x9 mb-3">
          {selectedLesson ? (
            <iframe
              src={selectedLesson.videoUrl}
              title={selectedLesson.title}
              allowFullScreen
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center bg-light">
              Select a lesson to start
            </div>
          )}
        </div>

        <h5>{selectedLesson?.title || "Select a lesson"}</h5>
      </div>

    </div>
  </div>
);
}