import express from 'express'
import { getCategory } from '../controller/Category.Controller.js';

const categoryRoute=express.Router();


categoryRoute.get("/",getCategory)
//courseRoute.get("/:id",getCourse)



export default categoryRoute;