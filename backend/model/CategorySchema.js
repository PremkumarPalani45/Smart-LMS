import mongoose, { Schema } from "mongoose";


const categorySchema=new Schema({
    name:{type:String,required:true,unique:true}

});




const category=mongoose.model('Category',categorySchema)

export default category;
