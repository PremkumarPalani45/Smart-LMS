import express from 'express'
import { authProtect } from '../middleware/authMiddleware.js';
import { createPaymentIntent } from '../controller/Payment.controller.js';

const paymentRoute=express.Router();


paymentRoute.post("/create-payment-intent",authProtect,createPaymentIntent)
//courseRoute.get("/:id",getCourse)



export default paymentRoute;