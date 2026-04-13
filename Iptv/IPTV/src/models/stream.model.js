import mongoose from "mongoose";

const streamSchema = new mongoose.Schema(
  {
    episodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
      required: true,
    },
    title: { type: String, required: true },
    quality: {
      type: String,
      enum: ["360p", "480p", "720p", "1080p", "4K"],
      required: true,
    },
    streamingPlatform: { type: String, required: true },
  },
  { timestamps: true }
);

const StreamModel = mongoose.model("Stream", streamSchema);

export default StreamModel;
