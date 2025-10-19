import jwt from 'jsonwebtoken'
import Model from '../model/UserSchema'

export const authProtect= async(req,res,next)=>{
    // bearer token
  if(!req.headers.authorization && !req.headers.authorization.startsWith("Bearer"))
  {
    return res.status(401).send("Unauthorized error")
  }
  try{
  const AuthArr= req.headers.authorization.split(" ")

  const auth=AuthArr[1];

  // docode the token
  const decodeToken= jwt.verify(auth,process.env.JWT_SECRET)

  // fetch user info
  req.user=await Model.findById(decodeToken.user.id).select("-password")
  next();


  }
  catch(err){
return res.status(401).send(`Unauthorized ${err}`)
  }

  

}