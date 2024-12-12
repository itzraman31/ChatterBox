import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const url=process.env.mongodb

const connectDB=()=>{
    try {    
        mongoose.connect(url);
        console.log("Connected succesfully")
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB