import express from 'express'
import { loginUser,registerUser,getMe } from '../controller/Auth.Controller.js';
import { authProtect } from '../middleware/authMiddleware.js';

const Authroute=express.Router();


Authroute.post("/register",registerUser)
Authroute.post("/login",loginUser)
Authroute.get("/me", authProtect,getMe );


export default Authroute;