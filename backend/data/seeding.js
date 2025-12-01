// data/seeding.js
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

// import DB connection (the "different file" you mentioned)
import mongooseConnect from "../config/mongoose.js"; // <-- adjust path based on where your db file is

import Category from "../model/CategorySchema.js";
import Course from "../model/CourseSchema.js";
import User from "../model/UserSchema.js";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongooseConnect();

const importData = async () => {
  try {
    // clear the database
    await User.deleteMany();
    await Course.deleteMany();
    await Category.deleteMany();

    // insert the data
    const userData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
    );

    // hash password
    const usersWithHashedPass = userData.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    const createdUsers = await User.insertMany(usersWithHashedPass);
    console.log("instrutor")
    const instructorUser = createdUsers.find(
      (user) => user.role === "Instructor"
    ); // to be used as ref in course
    const categoryData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "category.json"), "utf-8")
    );

    const createdCategories = await Category.insertMany(categoryData);

    const webDevCategory = createdCategories.find(
      (cat) => cat.name === "Web Dev"
    );

    // insert courses
    const courses = [
      {
        title: "Complete Web Dev Course 2025",
        description: "Random text about the course",
        price: 99,
        instructor: instructorUser?._id,
        category: webDevCategory?._id,
      },
    ];


    await Course.insertMany(courses);

    console.log("✅ Data is added to database");
    process.exit();
  } catch (err) {
    console.log(`❌ Error while adding data: ${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();
    await Category.deleteMany();

    console.log("🗑️ Data is destroyed");
    process.exit();
  } catch (err) {
    console.log(`❌ Error while destroying data: ${err}`);
    process.exit(1);
  }
};

// logic to run seed file for different methods
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
