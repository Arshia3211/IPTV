import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema(
  {
    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: true,
    },
    seasonNumber: { type: Number, required: true },
    title: { type: String, required: true, maxlength: 150 },
    image: { type: String }, // /uploads/filename for season picture
  },
  { timestamps: true }
);

export const SeasonModel = mongoose.model("Season", seasonSchema);
export default SeasonModel;