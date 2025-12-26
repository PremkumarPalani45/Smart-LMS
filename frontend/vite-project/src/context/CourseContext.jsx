import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3003/api/courses"
      );
      setCourses(res.data); // 👈 backend returns array
    } catch (err) {
      console.error("Error fetching courses:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch courses on app load
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  return useContext(CourseContext);
};
