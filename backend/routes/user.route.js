import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import multer from "multer";
import path from "path";

const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix =Date.now() + "_" + Math.round(Math.random() * 1e9);
        const ext =path.extname(file.originalname);
        cb(null,file.fieldname + "_" + uniqueSuffix + ext);
    },
});

const upload =multer({
    storage,
    limits:{fileSize: 2 * 1024 * 1024}, //2MB limit
    fileFilter:(req,file,cb)=>{
         if(file.mimetype.startsWith("image/")){
            cb(null,true); //accept image files
         }else{
            cb(new Error("❌ Only image files are allowed!")); //reject others
         }
    }
});






const router =express.Router();

router.patch("/update/:id",verifyToken, upload.single("image") ,updateUser);
router.delete("/delete/:id",verifyToken,deleteUser);
export default router;