import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CourseContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

 const fetchCourses = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${backendUrl}/api/courses`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    setCourses(res.data.courses);
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
