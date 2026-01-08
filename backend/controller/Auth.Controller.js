import users from "../model/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  console.log("🔥 REGISTER API HIT");
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user (explicit role)
    const user = new users({
      name,
      email,
      password: hashedPassword,
      role: "Student" // must match enum exactly
    });

    // 4. Save user (IMPORTANT)
    await user.save();
    console.log("✅ USER SAVED:", user._id);

    // 5. Create JWT
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        return res.status(201).json({ token });
      }
    );

  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("EMAIL:", email);

  try {
    const existingUser = await users.findOne({ email });
    console.log("USER FOUND:", existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    const payload = {
      user: {
        id: existingUser._id,
        role: existingUser.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "token error" });
        }
        return res.status(200).json({
  token,
  user: {
    id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role
  }
});

      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" });
  }
};
