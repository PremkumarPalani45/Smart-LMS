import express from 'express'
import { loginUser,registerUser } from '../controller/Auth.Controller.js';

const Authroute=express.Router();


Authroute.post("/register",registerUser)
Authroute.post("/login",loginUser)



export default Authroute;