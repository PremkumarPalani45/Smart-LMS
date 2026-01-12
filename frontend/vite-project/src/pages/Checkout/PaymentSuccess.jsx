import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // optional icon lib
import API from "../../utils/api";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
  API.post("/order/complete").catch(() => {});
}, []);

  return (
    <div className="container mt-5 pt-5 d-flex justify-content-center">
      <div
        className="card shadow-sm border-0 p-5 text-center"
        style={{ maxWidth: "420px" }}
      >
        {/* ✅ Success Icon */}
        <CheckCircle size={72} className="text-success mb-3" />

        <h4 className="fw-bold mb-2">Payment Successful 🎉</h4>

        <p className="text-muted mb-4">
          Your courses have been unlocked. Happy learning!
        </p>

        <button
          className="btn btn-primary w-100"
          onClick={() => navigate("/learning")}
        >
          Go to My Courses
        </button>
      </div>
    </div>
  );
}
