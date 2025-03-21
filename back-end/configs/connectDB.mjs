import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
    console.error("Error connecting to MongoDB!");
  }
};

export default connectDB;
