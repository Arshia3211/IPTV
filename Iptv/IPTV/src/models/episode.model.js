import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    seasonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: true,
    },
    episodeNumber: { type: Number, required: true },
    title: { type: String, required: true, maxlength: 150 },

    seasonNumber: { type: Number, required: true },
    duration: { type: Number, required: true }, 
  },

  { timestamps: true }
);

 const EpisodeModel = mongoose.model("Episode", episodeSchema);
export default EpisodeModel;
