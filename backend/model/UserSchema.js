import mongoose, { Schema } from "mongoose";


const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['Student','Instructor','Admin'],default:'student'}

});

const Model=mongoose.model('User',userSchema)

export default Model;
