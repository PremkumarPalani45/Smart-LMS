import users from "../model/UserSchema.js";


export const uploadAvatar = async (req, res) => {
  try {
    const user = await users.findById(req.user.id);
     console(`image:${req.file.filename}`)
    user.avatar = `/upload/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      avatar: user.avatar,
      message: "Avatar updated successfully"
    });
  } catch (err) {
    res.status(500).json({ message: "Avatar upload failed" });
  }
};


export const getUserProfile=async(req,res)=>{


    const user=await users.findById(req.user._id)

    if(!user){
        
 return res.status(404).json("user not found");

    }
    return res.status(200).json({id:user._id,name:user.name,email:user.email,avatar: user.avatar })
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


