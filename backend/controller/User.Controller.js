import users from "../model/UserSchema.js";

export const getUserProfile=async(req,res)=>{


    const user=await users.findById(req.user._id)

    if(!user){
        
 return res.status(404).json("user not found");

    }
    return res.status(200).json({id:user._id,name:user.name,email:user.email})
}

export const UpdateUserProfile=async(req,res)=>{
     
    const {name,email}=req.body;


    const user=await users.findById(req.user._id)

    if(!user){
        
 return res.status(404).json("user not found");

    }
    user.name=name? name : user.name;
    user.email=email? email:user.email;

    const updateduser=await user.save();
    return res.status(200).json({id:updateduser._id,name:updateduser.name,email:updateduser.email},{message:"user details updated"})
}


