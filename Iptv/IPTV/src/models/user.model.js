import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
); 
const userModel = mongoose.model("User", schema);
export default userModel;

