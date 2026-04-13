import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 150 },
    description: { type: String, maxlength: 600 },
    releaseDate: { type: Date },
  },
  { timestamps: true }
);

const SeriesModel = mongoose.model("Series", seriesSchema);
export default SeriesModel;
