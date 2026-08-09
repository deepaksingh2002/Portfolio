import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGO_URI}/${Portfolio}`)
        console.log(`MongoDB Connected!! DB Host: ${connectInstance.connection.host}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}