import express from 'express'
import { getCourses,getCourse, enrollStudentIncourse,enrolledCourses } from '../controller/Course.Controller.js';
import { authProtect } from '../middleware/authMiddleware.js';

const courseRoute=express.Router();

courseRoute.get("/myCourses",authProtect,enrolledCourses)
courseRoute.get("/",getCourses)
courseRoute.get("/:id",getCourse)


courseRoute.post("/:id/enroll",authProtect,enrollStudentIncourse)



export default courseRoute;