import users from "../model/UserSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { token } from "morgan";

export const registerUser= async(req,res)=>{
// get user 


  const{name,email,password}= req.body;

try{
  // check user already there 
   const existingUser = await users.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"user already exists"})
    }

    // create password hash
    const salt=await bcrypt.genSalt(10)
    const newPassword= await bcrypt.hash(password,salt);

    const user= new users({
        name:name,
        email:email,
        password:newPassword
    })

    await user.save();
   // create and return token

   const payload= {
    user:{
        id:user.id,
        role:user.role
    }
   }

   jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1h' }
    ,(err,token)=>{
        if(err){
           console.log(err)
        }
        // return token
        return res.status(201).json({token:token})
    }
   )
}
catch(err){
     console.log(err);
    //  throw new Error(err);
    return  res.status(500).send("server Error")
}
}

export const loginUser= async(req,res)=>{
  // get user 


  const{email,password}= req.body;

try{
  // check user already there 
   const existingUser = await Model.findOne({email})
    if(!existingUser){
        return res.status(404).json({message:"user not found"})
    }

    //match password
  const isMatch=await bcrypt.compare(password,existingUser.password)
  
  if(!isMatch){
    return res.status(400).send("invalid password")
  }


   const payload= {
    user:{
        id:existingUser.id,
        role:existingUser.role
    }
   }

   jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1h' }
    ,(err,token)=>{
        if(err){
           console.log(err)
        }
        // return token
        return res.status(201).json({token:token})
    }
   )
}
catch(err){
     console.log(err);
    //  throw new Error(err);
    return  res.status(500).send("server Error")
}
}