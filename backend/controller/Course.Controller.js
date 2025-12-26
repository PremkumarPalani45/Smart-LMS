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