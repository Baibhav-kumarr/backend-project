import mongoose from "mongoose";
import { DBname } from "../constants.js";
 const connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}/${DBname}`);
        console.log("Database connected successfully");
    }
    catch(error){
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
export default connectDB;