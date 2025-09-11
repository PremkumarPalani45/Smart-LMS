import mongoose, { Schema } from "mongoose";


const courseSchema=new Schema({
     title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true,default:0},
    instructor:
    {type:Schema.Types.ObjectId,
        ref:'User', required:true},

    category: {type:Schema.Types.ObjectId,
        ref:'Category', required:true},

});




const Model=mongoose.model('Courses',courseSchema)

export default Model;
