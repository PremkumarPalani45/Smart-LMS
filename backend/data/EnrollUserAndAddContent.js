import dotenv from "dotenv";
import mongooseConnect from "../config/mongoose.js";

import Course from "../model/CourseSchema.js";
import User from "../model/UserSchema.js";

dotenv.config();

const seedEnrollmentAndContent = async () => {
  try {
    // Connect to MongoDB
    await mongooseConnect();

    console.log("✅ MongoDB connected");

    // --------------------------------
    // FIND STUDENT
    // --------------------------------

    const student = await User.findOne({
      role: "Student",
    });

    if (!student) {
      throw new Error("❌ No Student user found in database");
    }

    console.log("👤 Student found:", student.email);

    // --------------------------------
    // FIND COURSE
    // --------------------------------

    const selectedCourse = await Course.findOne({
      title: "JavaScript Course 2025",
    });

    if (!selectedCourse) {
      throw new Error(
        "❌ JavaScript Course 2025 not found"
      );
    }

    console.log(
      "📚 Course found:",
      selectedCourse.title
    );

    // --------------------------------
    // ADD ENROLLMENT + CONTENT
    // --------------------------------

    const updatedCourse =
      await Course.findByIdAndUpdate(
        selectedCourse._id,
        {
          $addToSet: {
            enrolledStudents: student._id,
          },

          $set: {
            modules: [
              {
                title: "JavaScript Basics",

                lessons: [
                  {
                    title: "Introduction to JavaScript",
                    videoUrl:
                      "https://www.youtube.com/embed/W6NZfCO5SIk",
                    duration: 10,
                  },

                  {
                    title: "Variables & Data Types",
                    videoUrl:
                      "https://www.youtube.com/embed/9emXNzqCKyg",
                    duration: 15,
                  },
                ],
              },

              {
                title: "Advanced JavaScript",

                lessons: [
                  {
                    title: "Closures Explained",
                    videoUrl:
                      "https://www.youtube.com/embed/1JsJx1x35c0",
                    duration: 18,
                  },

                  {
                    title: "Async & Await",
                    videoUrl:
                      "https://www.youtube.com/embed/V_Kr9OSfDeU",
                    duration: 14,
                  },
                ],
              },
            ],
          },
        },
        {
          new: true,
        }
      );

    console.log("🎉 Enrollment and course content added");

    console.log(
      "Course ID:",
      updatedCourse._id.toString()
    );

    console.log(
      "Enrolled Students:",
      updatedCourse.enrolledStudents
    );

    console.log(
      "Modules:",
      updatedCourse.modules.length
    );

    process.exit(0);
  } catch (err) {
    console.error(
      "❌ Seeder error:",
      err
    );

    process.exit(1);
  }
};

seedEnrollmentAndContent();