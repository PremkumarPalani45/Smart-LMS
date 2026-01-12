import Cart from "../model/CartSchema.js";
import Course from "../model/CourseSchema.js";


export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware

    const cart = await Cart.findOne({ user: userId })
      .populate("items.course", "title price image rating category");

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        items: [],
        total: 0,
      });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.priceAtAddTime,
      0
    );

    res.status(200).json({
      success: true,
      items: cart.items,
      total,
    });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.course.toString() !== courseId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Course removed from cart",
      cart,
    });
  } catch (err) {
    console.error("Remove cart error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // 1️⃣ Validate course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2️⃣ Find cart
    let cart = await Cart.findOne({ user: userId });

    // 3️⃣ Create cart if not exists
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // 4️⃣ Prevent duplicate course
    const alreadyExists = cart.items.some(
      (item) => item.course.toString() === courseId
    );

    if (alreadyExists) {
      return res.status(409).json({
        message: "Course already in cart",
      });
    }

    // 5️⃣ Add to cart
    cart.items.push({
      course: course._id,
      priceAtAddTime: course.price,
    });

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Course added to cart",
      cart,
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
