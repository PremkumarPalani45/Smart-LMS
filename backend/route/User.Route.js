import express from 'express'
import { authProtect } from '../middleware/authMiddleware';
import { getUserProfile,UpdateUserProfile } from '../controller/User.Controller';

const UserRoute=express.Router();

UserRoute.get("/profile",authProtect,getUserProfile)
UserRoute.put("/profile",authProtect,UpdateUserProfile)




export default UserRoute;