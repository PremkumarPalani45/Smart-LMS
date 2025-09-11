import mongoose, { Schema } from "mongoose";


const categorySchema=new Schema({
    name:{type:String,required:true,unique:true}

});




const Model=mongoose.model('Category',categorySchema)

export default Model;
