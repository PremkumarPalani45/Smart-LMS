import express from 'express'
import { authProtect } from '../middleware/authMiddleware';
import { createPaymentIntent } from '../controller/Payment.controller';

const paymentRoute=express.Router();


paymentRoute.post("/create-payment-intent",authProtect,createPaymentIntent)
//courseRoute.get("/:id",getCourse)



export default paymentRoute;