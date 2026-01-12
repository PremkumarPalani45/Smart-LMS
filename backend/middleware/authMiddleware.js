import jwt from "jsonwebtoken";
import User from "../model/UserSchema.js";

export const authProtect = async (req, res, next) => {
  try {
    console.log("🔐 AUTH HEADER:", req.headers.authorization);

    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log("🧪 TOKEN RECEIVED:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ TOKEN DECODED:", decoded);

    req.user = await User.findById(decoded.user.id).select("-password");
    console.log("👤 USER FROM TOKEN:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("🔥 AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
