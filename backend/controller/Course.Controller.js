import course from "../model/CourseSchema";


export const getCourses= async(req,res)=>{


    try{
      const Courses=await course.find({}).populate('category','name').populate('instructor','name');
      res.status(200).json(Courses);
    }
    catch(err){
    return res.status(500).json("server error");
    }
}
export const getCourse=async(req,res)=>{
    
   const  courseid= req.params.id;
   try{
      const Course=await course.findById(courseid).populate('category','name').populate('instructor','name');

      if(!Course){
     return res.status(404).json("Course not found");

      }
      res.status(200).json(Course);
    }
    catch(err){
    return res.status(500).json("server error");
    }
}