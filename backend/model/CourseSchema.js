import mongoose, { Schema } from "mongoose";


//lesson schema

const lessonSchema=new Schema({
    title:{type:String,required:true},
    videoUrl:{type:String,required:true}
})


//module schema

const moduleSchema=new Schema({
    title:{type:String,required:true},
    lessons:[lessonSchema],
})

const courseSchema=new Schema({
     title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true,default:0},
    instructor:
    {type:Schema.Types.ObjectId,
        ref:'User', required:true},

    category: {type:Schema.Types.ObjectId,
        ref:'Category', required:true},
        image: {
  type: String,
  required: true
},
enrolledStudents:[{
    type:Schema.Types.ObjectId,
        ref:'User'}],

       modules: [moduleSchema], 
  },
  {
    timestamps: true, 
  }
);



const course=mongoose.model('Courses',courseSchema)

export default course;
