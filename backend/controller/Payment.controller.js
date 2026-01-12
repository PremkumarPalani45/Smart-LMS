import Stripe from "stripe";
import Cart from "../model/CartSchema.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    // 1️⃣ Fetch user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.course",
      "title price"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Convert cart → Stripe line items
    const line_items = cart.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.course.title, // 🔥 course name in Stripe
        },
        unit_amount: Math.round(item.priceAtAddTime * 100), // ₹ → paise
      },
      quantity: 1,
    }));

    // 3️⃣ Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: req.user.email,
      line_items,
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout error:", err);
    res.status(500).json({ message: "Stripe error" });
  }
};
