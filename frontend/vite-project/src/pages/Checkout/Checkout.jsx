import { useLocation } from "react-router-dom";
import API from "../../utils/api";

export default function Checkout() {
  const token = localStorage.getItem("token");
  const { state } = useLocation();

  const subtotal = state?.subtotal || 0;
  const taxAmount = state?.taxAmount || 0;
  const grandTotal = state?.grandTotal || 0;

  const handleCheckout = async () => {
    try {
      const res = await API.post(
        "/payment/create-checkout-session",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 border-0">
            <h4 className="fw-bold mb-3">Order Summary</h4>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Tax</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleCheckout}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
