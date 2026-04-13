import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const FileModel = mongoose.model("File", fileSchema);
export default FileModel;
