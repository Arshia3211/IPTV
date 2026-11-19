import mongoose from "mongoose";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/IPTV");
  console.log("MongoDB Connected");
};

export default connectDB;
