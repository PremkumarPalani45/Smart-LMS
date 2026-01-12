import Cart from "../model/CartSchema.js";
import Course from "../model/CourseSchema.js";

export const completePurchase = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Get cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Enroll user in each course
    for (const item of cart.items) {
      await Course.findByIdAndUpdate(
        item.course,
        {
          $addToSet: { enrolledStudents: userId } // 🔥 prevents duplicates
        }
      );
    }

    // 3️⃣ Clear cart
    cart.items = [];
    await cart.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ message: "Purchase failed" });
  }
};
