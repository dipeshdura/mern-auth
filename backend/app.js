import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { config } from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';

import job from "./utils/cron.js";

config();
const app =express();

if(process.env.NODE_ENV ==="production") job.start();
//static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'backend/uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());


app.get("/api/health",(req,res)=>{
    res.status(200).json({status:"ok"})
})
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