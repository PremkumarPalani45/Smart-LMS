import express from "express";
import { authProtect } from "../middleware/authMiddleware.js";
import { createCheckoutSession } from "../controller/Payment.controller.js";

const paymentRoute = express.Router();

paymentRoute.post(
  "/create-checkout-session",
  authProtect,
  createCheckoutSession
);

export default paymentRoute;
