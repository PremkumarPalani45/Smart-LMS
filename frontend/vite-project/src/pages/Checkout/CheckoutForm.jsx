import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Wait until Stripe Elements is fully ready
  useEffect(() => {
    if (stripe && elements) {
      setIsReady(true);
    }
  }, [stripe, elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (error) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  return (
  <form
    onSubmit={handleSubmit}
    style={{
      maxWidth: "420px",
      width: "100%",
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    }}
  >
    {/* 🔹 ORDER SUMMARY (YOU CONTROL THIS) */}
    <h5 className="fw-bold mb-3">Order Summary</h5>

    <ul className="list-group mb-3">
      {cartItems.map((item) => (
        <li
          key={item.course._id}
          className="list-group-item d-flex justify-content-between"
        >
          <span>{item.course.title}</span>
          <span>${item.priceAtAddTime.toFixed(2)}</span>
        </li>
      ))}
    </ul>

    <div className="d-flex justify-content-between">
      <span>Subtotal</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>

    <div className="d-flex justify-content-between">
      <span>Tax (18%)</span>
      <span>${taxAmount.toFixed(2)}</span>
    </div>

    <hr />

    <div className="d-flex justify-content-between fw-bold mb-3">
      <span>Total</span>
      <span>${grandTotal.toFixed(2)}</span>
    </div>

    {/* 🔹 STRIPE PAYMENT UI */}
    {isReady && (
      <div className="mb-3">
        <PaymentElement />
      </div>
    )}

    <button
      type="submit"
      className="btn btn-primary w-100"
      disabled={!isReady || isSubmitting}
    >
      {isSubmitting ? "Processing…" : "Pay Now"}
    </button>
  </form>
);

}
