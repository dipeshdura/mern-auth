import mongoose from "mongoose";

const connectToDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB !");
    } catch (error) {
        console.error("❌ Not Connected to MongoDB ! ", error.message);
        process.exit(1);
    }
}
export default connectToDB;