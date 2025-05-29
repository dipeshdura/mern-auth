import {asyncHandler, errorHandler} from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const updateUser =asyncHandler(async(req,res,next)=>{
    let {username, email,password, profilePicture} =req.body;
    
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"❌ Not authenticated!"));
    }
   
        if(password){
           password =bcrypt.hashSync(password,10);
        }
        //Handle upload file
        if(req.file){
            profilePicture =req.file.filename;
            
        }
         const updateFields = {};
        if (username) updateFields.username = username;
         if (email) updateFields.email = email;
        if (password) updateFields.password = password;
        if (profilePicture) updateFields.profilePicture =`http://localhost:3000/uploads/${profilePicture}`;
        console.log(profilePicture);
        
      

        const userUpdate =await User.findByIdAndUpdate(
            req.params.id,
            {$set:updateFields},
            {new:true}
        );
        if(!userUpdate){
            return next(errorHandler(404,"User not Found"));
        }
        const {password:hashedPassword,...rest} =userUpdate._doc;
        res.status(200).json({"user":rest,message:"✅ User updated Successfully 🥶"});
  
})
export const deleteUser =asyncHandler(async(req,res,next)=>{
 
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,"❌Not authenticated"));
    }
    const user =await User.findByIdAndDelete(req.params.id);
    
    if(!user){
        return next(errorHandler(404,"❌ User not found!😳"))
    }
    res.status(200).json("✅ User deleted successfully 🗑️")
})