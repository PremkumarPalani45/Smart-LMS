import express from "express";
import { authProtect } from "../middleware/authMiddleware.js";
import { completePurchase } from "../controller/Order.controller.js";

const Orderrouter = express.Router();

Orderrouter.post("/complete", authProtect, completePurchase);

export default Orderrouter;
