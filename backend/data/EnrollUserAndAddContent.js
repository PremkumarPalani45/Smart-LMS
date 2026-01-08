import mongoose from "mongoose";
import dotenv from "dotenv";
import course from "../model/CourseSchema.js"; // adjust path if needed
import mongooseConnect from "../config/mongoose.js";
dotenv.config();

const USER_ID = "695e3258d2a13d040fa4ec8b";
const COURSE_ID = "692f213b1dde6616fb8435c0";

const seedEnrollmentAndContent = async () => {
  try {
   // await mongoose.connect(process.env.DB_URL);
    mongooseConnect();
    console.log("✅ MongoDB connected");

    await course.findByIdAndUpdate(
      COURSE_ID,
      {
        // add enrolled user (no duplicates)
        $addToSet: {
          enrolledStudents: USER_ID,
        },

        // add modules + lessons
        $set: {
          modules: [
            {
              title: "JavaScript Basics",
              lessons: [
                {
                  title: "Introduction to JavaScript",
                  videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
                  duration: 10,
                },
                {
                  title: "Variables & Data Types",
                  videoUrl: "https://www.youtube.com/embed/9emXNzqCKyg",
                  duration: 15,
                },
              ],
            },
            {
              title: "Advanced JavaScript",
              lessons: [
                {
                  title: "Closures Explained",
                  videoUrl: "https://www.youtube.com/embed/1JsJx1x35c0",
                  duration: 18,
                },
                {
                  title: "Async & Await",
                  videoUrl: "https://www.youtube.com/embed/V_Kr9OSfDeU",
                  duration: 14,
                },
              ],
            },
          ],
        },
      },
      { new: true }
    );

    console.log("🎉 User enrolled & course content added");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  }
};

seedEnrollmentAndContent();
