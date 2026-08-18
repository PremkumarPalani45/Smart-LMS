import "dotenv/config";

import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

import mongooseConnect from "../config/mongoose.js";

import Category from "../model/CategorySchema.js";
import Course from "../model/CourseSchema.js";
import User from "../model/UserSchema.js";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data
const importData = async () => {
  try {
    // Connect to MongoDB first
    await mongooseConnect();

    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Category.deleteMany();

    console.log("🗑️ Existing data cleared");

    // --------------------------------
    // USERS
    // --------------------------------

    const userData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "users.json"),
        "utf-8"
      )
    );

    // Hash passwords
    const usersWithHashedPass = userData.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(
        user.password,
        salt
      );

      return {
        ...user,
        password: hashedPassword,
      };
    });

    const createdUsers = await User.insertMany(
      usersWithHashedPass
    );

    console.log("✅ Users created");

    // --------------------------------
    // FIND INSTRUCTOR
    // --------------------------------

    let instructorUser = createdUsers.find(
      (user) => user.role === "Instructor"
    );

    // Fallback
    if (!instructorUser && createdUsers.length > 0) {
      instructorUser = createdUsers[0];

      console.warn(
        "⚠️ No user with role 'Instructor' found."
      );

      console.warn(
        "⚠️ Using the first user as instructor."
      );
    }

    // --------------------------------
    // CATEGORIES
    // --------------------------------

    const categoryData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "category.json"),
        "utf-8"
      )
    );

    const createdCategories = await Category.insertMany(
      categoryData
    );

    console.log("✅ Categories created");

    // Find categories
    const webDevCategory = createdCategories.find(
      (category) => category.name === "Web Dev"
    );

    const dsaCategory = createdCategories.find(
      (category) => category.name === "DSA"
    );

    const uiuxCategory = createdCategories.find(
      (category) => category.name === "UI/UX"
    );

    // --------------------------------
    // COURSES
    // --------------------------------

    const courses = [
      {
        title: "JavaScript Course 2025",
        description: "Entire JS course edition",
        price: 99,
        instructor: instructorUser?._id,
        category: webDevCategory?._id,
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
      },

      {
        title: "Data Structures & Algorithms 2025",
        description:
          "Complete DSA course with problems and solutions",
        price: 99,
        instructor: instructorUser?._id,
        category: dsaCategory?._id,
        image:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=60",
      },

      {
        title: "UI/UX Course 2025",
        description:
          "Full UI/UX design fundamentals and real projects",
        price: 99,
        instructor: instructorUser?._id,
        category: uiuxCategory?._id,
        image:
          "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=60",
      },
    ];

    await Course.insertMany(courses);

    console.log("✅ Courses created");

    console.log("🎉 Data successfully added to database!");

    process.exit(0);
  } catch (err) {
    console.error(
      "❌ Error while adding data:",
      err
    );

    process.exit(1);
  }
};

// --------------------------------
// DESTROY DATA
// --------------------------------

const destroyData = async () => {
  try {
    // Connect to MongoDB first
    await mongooseConnect();

    console.log("🗑️ Destroying database data...");

    await User.deleteMany();
    await Course.deleteMany();
    await Category.deleteMany();

    console.log("🗑️ Data successfully destroyed");

    process.exit(0);
  } catch (err) {
    console.error(
      "❌ Error while destroying data:",
      err
    );

    process.exit(1);
  }
};

// --------------------------------
// COMMAND
// --------------------------------

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}