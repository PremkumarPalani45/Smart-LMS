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

    // load data files
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
    console.log("✅ Users created");

    // pick an instructor (fallback to first user if no Instructor role found)
    let instructorUser = createdUsers.find((u) => u.role === "Instructor");
    if (!instructorUser && createdUsers.length > 0) {
      instructorUser = createdUsers[0];
      console.warn(
        "⚠️ No user with role 'Instructor' found — falling back to first user as instructor."
      );
    }

    const categoryData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "category.json"), "utf-8")
    );

    const createdCategories = await Category.insertMany(categoryData);
    console.log("✅ Categories created");

    // find categories by name (case-sensitive to match your category.json names)
    const webDevCategory = createdCategories.find((c) => c.name === "Web Dev");
    const dsaCategory = createdCategories.find((c) => c.name === "DSA");
    const uiuxCategory = createdCategories.find((c) => c.name === "UI/UX");

    // build courses — one per category, each referencing the instructor
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
    description: "Complete DSA course with problems and solutions",
    price: 99,
    instructor: instructorUser?._id,
    category: dsaCategory?._id,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "UI/UX Course 2025",
    description: "Full UI/UX design fundamentals and real projects",
    price: 99,
    instructor: instructorUser?._id,
    category: uiuxCategory?._id,
    image:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=60",
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
