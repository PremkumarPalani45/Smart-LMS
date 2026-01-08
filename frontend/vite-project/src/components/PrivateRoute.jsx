import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
 const { user, authLoading } = useAuth();

console.log("🛡️ PrivateRoute → user:", user, "loading:", authLoading);


  if (authLoading) {
    return null; // or spinner
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
