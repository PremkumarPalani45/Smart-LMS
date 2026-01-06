import course from "../model/CourseSchema.js";
import course from "../model/CourseSchema.js";



import Course from "../model/CourseSchema.js";

export const getCourses = async (req, res) => {
  try {
    const { search, category, instructor, priceType } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category; // ObjectId
    }

    if (instructor) {
      filter.instructor = instructor; // ObjectId
    }

    if (priceType === "Free") {
      filter.price = 0;
    }

    if (priceType === "Paid") {
      filter.price = { $gt: 0 };
    }

    const courses = await Course.find(filter)
      .populate("category", "name")
      .populate("instructor", "name");

    res.set("Cache-Control", "no-store");

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


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

export const enrollStudentIncourse = async(req,res)=>{
   // enroll user into course

   //course id
   // fetch course from the database
   try{

   
   const courses= await course.findById(req.params.id);

   if(!course){
   return res.status(404).json({message:"course not found"});
   }

    // if user already purchased
    if(courses.enrolledStudents.includes(req.user._id))
    {
       return res.status(400).json({message:"user is already enrolled in the course"});
    }
    // or else update userid inside course
   courses.enrolledStudents.push(req.user._id)

   await courses.save();

   res.status(200).json({message:"user has been enrolled"})
  }
  catch(error){
    return res.status(500).json({message:error});
  }
}


export const enrolledCourses=async(req,res)=>{
  //get my courses

  try{
 const myCourses= await course.find({enrolledStudents:req.user._id});
 
 return res.status(200).json(myCourses)
  }
  catch(err){

  }
}