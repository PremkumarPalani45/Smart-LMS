// App.jsx
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Routes, Route } from "react-router-dom";
import SingleCourses from "./pages/Courses/SingleCourse";
import PrivateRoute from "./components/PrivateRoute";
import MyLearningPage from "./pages/MyCourses/MyLearningPage";
import LearnCourse from "./pages/MyCourses/LearnCourse";
import Userprofile from "./pages/profile/Userprofile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import CartPage from "./pages/Cart/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import PaymentSuccess from "./pages/Checkout/PaymentSuccess";


export default function App() {
   const { authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<SingleCourses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute/>}>
           <Route path="/learning" element={<MyLearningPage />} />
           <Route path="/learning/:courseId" element={<LearnCourse />} />
           <Route path="/profile" element={<Userprofile/>}/>
           <Route path="/cart" element={<CartPage/>}/>
           <Route path="/checkout" element={<Checkout/>}/>
           <Route path="/payment-success" element={<PaymentSuccess />} />
           </Route>
        </Routes>
      </main>

      <Footer />
       {/* 🔥 Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
