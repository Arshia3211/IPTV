import mongoose from "mongoose";
const genreSchema = new mongoose.Schema
(
  {
  name: { type: String, required: true, maxlength: 75 },
},
 { timestamps: true },
);
 const GenreModel = mongoose.model("Genre", genreSchema);
 export default GenreModel;
