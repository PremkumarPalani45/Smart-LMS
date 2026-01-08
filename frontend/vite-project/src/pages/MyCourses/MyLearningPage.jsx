import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { CourseCard} from "./CourseCard";
import { CourseSkeleton } from "./CourseSkeleton";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function MyLearningPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchMyCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${backendUrl}/api/courses/myCourses`,
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyCourses();
  }, [user]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Courses</h2>

      {/* Skeleton while loading */}
      {loading && <CourseSkeleton />}

      {/* Empty state */}
       {!loading && courses.length === 0 && (
      <div className="text-center py-5">
        <h5 className="mb-3">You haven’t enrolled in any courses yet 📚</h5>
        <p className="text-muted mb-4">
          Explore our courses and start learning today.
        </p>
        <a href="/courses" className="btn btn-primary">
          Browse Courses
        </a>
      </div>
    )}

      {/* Courses */}
      <div className="row">
        {!loading &&
          courses.map((course) => (
            <div className="col-md-4 mb-4" key={course._id}>
              <CourseCard course={course} />
            </div>
          ))}
      </div>
    </div>
  );
}
