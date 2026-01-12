import express from 'express'
import { authProtect } from '../middleware/authMiddleware.js';
import { getUserProfile,UpdateUserProfile,uploadAvatar } from '../controller/User.Controller.js';
import { upload } from '../middleware/upload.js';

const UserRoute=express.Router();

UserRoute.get("/profile",authProtect,getUserProfile)
UserRoute.put("/profile",authProtect,UpdateUserProfile)
UserRoute.put("/avatar",authProtect,upload.single("avatar"),uploadAvatar);





export default UserRoute;