import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MONGODB Connected"))
.catch((err)=>console.log("MONGODB Error",err));


const app =express();

app.listen(3000,()=>{
    console.log("Server listening on port 3000");
})