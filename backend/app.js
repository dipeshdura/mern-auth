import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { config } from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
config();
const app =express();

//static 


//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

//routes middleware
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message =err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    });
});





export default app;