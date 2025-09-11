import mongoose from "mongoose";



    const mongooseConnect= async()=>{
        try {
        await mongoose.connect('mongodb://localhost:27017/test');
     console.log("mongoose is connected")
    }
    catch (err) {
    console.log('Failed', i);
  }
  }
   



  export default mongooseConnect;