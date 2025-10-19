import express from 'express'
import { getCourses,getCourse } from '../controller/Course.Controller.js';

const courseRoute=express.Router();


courseRoute.get("/",getCourses)
courseRoute.get("/:id",getCourse)



export default courseRoute;