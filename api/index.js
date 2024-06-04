import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MONGODB Connected"))
.catch((err)=>console.log("MONGODB Error",err));


const app =express();

app.listen(3000,()=>{
    console.log("Server listening on port 3000");
})
app.use(express.json());
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);