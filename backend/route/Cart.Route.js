import express from "express";
import { addToCart,getCart,removeFromCart } from "../controller/Cart.Controller.js"
import { authProtect } from "../middleware/authMiddleware.js";

const CartRouter = express.Router();

CartRouter.post("/", authProtect, addToCart);          // add to cart
CartRouter.get("/", authProtect, getCart);             // get cart
CartRouter.delete("/:courseId", authProtect, removeFromCart); // remove item
CartRouter.post("/clear", authProtect, async (req, res) => {
  await Cart.findOneAndUpdate(
    { user: req.user._id },
    { items: [] }
  );
  res.json({ success: true });
});
export default CartRouter;
