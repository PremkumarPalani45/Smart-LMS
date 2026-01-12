import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, cartLoading } = useCart();
  const navigate = useNavigate();

  // ✅ ADD THIS BLOCK
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.priceAtAddTime,
    0
  );

  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  if (cartLoading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <p>Loading cart...</p>
      </div>
    );
  }



  return (
    <div className="container mt-5 pt-4">
      <h3 className="fw-bold mb-4">Your Cart</h3>

      {cartItems.length === 0 ? (
        <div className="card p-4 text-center shadow-sm">
          <p className="mb-3">Your cart is empty 🛒</p>
          <Link to="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* LEFT – CART ITEMS */}
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item.course._id}
                className="card mb-3 shadow-sm border-0"
              >
                <div className="row g-0 align-items-center">
                  <div className="col-md-4">
                    <img
                      src={item.course.image}
                      className="img-fluid rounded-start"
                      alt={item.course.title}
                    />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.course.title}
                      </h5>

                      <p className="fw-bold text-success">
                        ${item.priceAtAddTime}
                      </p>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          removeFromCart(item.course._id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT – SUMMARY */}
         <div className="col-lg-4">
  <div className="card shadow-sm border-0 p-4">
    <h5 className="fw-bold mb-3">Order Summary</h5>

    <div className="d-flex justify-content-between mb-2">
      <span>Total Courses</span>
      <span>{cartItems.length}</span>
    </div>

    <div className="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>

    <div className="d-flex justify-content-between mb-2">
      <span>Tax (18%)</span>
      <span>${taxAmount.toFixed(2)}</span>
    </div>

    <hr />

    <div className="d-flex justify-content-between fw-bold mb-3">
      <span>Grand Total</span>
      <span>${grandTotal.toFixed(2)}</span>
    </div>

    <button
      className="btn btn-primary w-100"
      disabled={cartItems.length === 0}
      onClick={() =>
        navigate("/checkout", {
          state: {
            subtotal,
            taxAmount,
            grandTotal,
          },
        })
      }
    >
      Proceed to Checkout
    </button>
  </div>
</div>

        </div>
      )}
    </div>
  );
}
