import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHandler, errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
export const signup =asyncHandler(async(req,res,next)=>{
    const {username, email, password} =req.body;
    if(!username || !email || !password){
       return next(errorHandler(400,"Invalid credentials"))
    }
    const hashPassword =bcrypt.hashSync(password,10);
    const newUser =new User({
        username,
        email,
        password:hashPassword
    })
    await newUser.save();
    return res.status(201).json({message:"User created Successfully"});
})


export const signin =asyncHandler(async(req,res,next)=>{
    const {email, password} =req.body;
    const validUser =await User.findOne({email});

    if(!validUser) return next(errorHandler(404,"User doesn't exists"));

    const validPassword =bcrypt.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(401,"Wrong Credentials"));

    const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET);

    const {password:hashedPassword, ...rest} =validUser._doc;

    const expiryDate =new Date(Date.now() + 3600000); //1hour
    res.cookie('access_token',token,{
        httpOnly:true,
        expires:expiryDate
    }).status(200).json(rest);


})