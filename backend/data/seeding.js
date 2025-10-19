import path from "path";
import category from "../model/CategorySchema";
import course from "../model/CourseSchema";
import users from "../model/UserSchema";
import fs from 'fs'
import bcyrpt from 'bcrypt'
const importData=async()=>{


    try{
//clear the database
await users.deleteMany();
await course.deleteMany();
await category.deleteMany();
//insert the data
const userData=JSON.parse(fs.readFileSync(path.join(__dirname,'/data/users.json'),'utf-8'));


//hash password
const userwithHashedpass= userData.map((user)=>{
    const salt= bcyrpt.genSaltSync(10);
    const hashpassword= bcyrpt.hashSync(user.password,salt)

    return{...user,password:hashpassword}
})

const createUsers= await users.insertMany(userwithHashedpass);


const instructorUser= createUsers.find((user)=>user.role==="instructor")// to be used a ref in course

const categoryData=JSON.parse(fs.readFileSync(path.join(__dirname,'/data/category.json'),'utf-8'));

const createcategory= await category.insertMany(categoryData);

const webDevcategory=createcategory.find((category)=>category.name==="Web Dev");

//insert courses
const courses=[{
   title: 'complete web dev course 2025',
   description: 'random text about the courses',
   price:99,
   instructor:instructorUser.id,
   category:webDevcategory.id

}]

await course.insertMany(courses);

console.log("data is added to database")
}
catch(err){
console.log(`error while adding data ${err}`)
}

//remove data
const destroyData=()=>{
   console.log("data is destroyed")
   process.exit()
}

// logic to add script file to run seed file for different methods


}