// src/pages/Home/Home.jsx
import "./home.css";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedCoursesSection from "./FeaturedCoursesSection";
import WhyChooseSection from "./WhyChooseSection";
import CtaSection from "./CtaSection";

import courseImg1 from "../../assets/course1.jpg";
import courseImg2 from "../../assets/course2.jpg";
import courseImg3 from "../../assets/course3.jpg";

export default function Home() {
  const categories = [
    { emoji: "💻", name: "Web Development", desc: "HTML, CSS, JavaScript, React" },
    { emoji: "📊", name: "Data & Analytics", desc: "Python, SQL, Dashboards" },
    { emoji: "🎨", name: "Design & UI", desc: "UI/UX, Figma, Wireframing" },
    { emoji: "🚀", name: "Career Skills", desc: "Communication, Interview Prep" },
  ];

  const featuredCourses = [
    {
      id: 1,
      title: "Complete MERN Stack for Beginners",
      level: "Beginner to Intermediate",
      duration: "10 weeks",
      students: 1200,
      category: "Web Development",
      instructor: "Prem Kumar",
      rating: 4.7,
      image: courseImg1,
    },
    {
      id: 2,
      title: "JavaScript Essentials: From Zero to Hero",
      level: "Beginner",
      duration: "4 weeks",
      students: 980,
      category: "Programming",
      instructor: "Rahul Sharma",
      rating: 4.5,
      image: courseImg2,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      level: "Beginner",
      duration: "6 weeks",
      students: 640,
      category: "Design",
      instructor: "Sara Williams",
      rating: 4.6,
      image: courseImg3,
    },
  ];

  return (
    <div className="home-page">
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturedCoursesSection featuredCourses={featuredCourses} />
      <WhyChooseSection />
      <CtaSection />
    </div>
  );
}
