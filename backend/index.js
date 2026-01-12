import dotenv from "dotenv";

// ✅ Load env FIRST (before any imports)
dotenv.config();

console.log("✅ ENV LOADED IN BOOTSTRAP");
console.log("🔑 STRIPE KEY IN BOOTSTRAP:", process.env.STRIPE_SECRET_KEY);

// ❗ Dynamically import the app AFTER env is ready
await import("./app.js");
