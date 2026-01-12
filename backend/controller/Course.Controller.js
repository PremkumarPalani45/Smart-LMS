import Course from "../model/CourseSchema.js";


export const getCourses = async (req, res) => {
  try {
    const { search, category, maxPrice, sort, minRating } = req.query;


    let filter = {};
    let sortQuery = { updatedAt: -1 }; // newest by default

    // 🔍 Search
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // 📂 Category
    if (category && category !== "All") {
  filter.category = category;
}

    // 💰 Price
    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    // ⭐ Rating filter
if (minRating) {
  filter.rating = { $gte: Number(minRating) };
}


    // ↕️ Sorting
    if (sort === "priceLow") sortQuery = { price: 1 };
    if (sort === "priceHigh") sortQuery = { price: -1 };
    if (sort === "title") sortQuery = { title: 1 };
    if (sort === "popular") sortQuery = { enrolledStudents: -1 };
    if (sort === "rating") sortQuery = { rating: -1 };


    const courses = await Course
      .find(filter)
      .populate("category", "name")
      .sort(sortQuery);

    res.set("Cache-Control", "no-store");

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    console.error("Get courses error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const getCourse = async (req, res) => {
  const courseid = req.params.id;

  try {
    const course = await Course.findById(courseid)
      .populate("category", "name")
      .populate("instructor", "name")
      .lean();

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const userId = req.user?._id;

    const isPurchased =
      course.price === 0 ||
      (userId &&
        course.enrolledStudents?.some(
          (id) => id.toString() === userId.toString()
        ));

    return res.status(200).json({
      ...course,
      isPurchased,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};



export const enrollStudentIncourse = async(req,res)=>{
   // enroll user into course

   //course id
   // fetch course from the database
   try{

   
   const courses= await Course.findById(req.params.id);

   if(!courses){
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
 const myCourses= await Course.find({enrolledStudents:req.user._id});
 
 return res.status(200).json(myCourses)
  }
  catch(err){

  }
}