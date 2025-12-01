import category from "../model/CategorySchema.js";


export const getCategory= async(req,res)=>{


    try{
      const categories=await category.find({});
      res.status(200).json(categories);
    }
    catch(err){
    return res.status(500).json("server error");
    }
}