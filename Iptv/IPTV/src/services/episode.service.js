import { EpisodeModel } from "../models/index.js";
import mongoose from "mongoose";

export const EpisodeService = {
  getAll: async (populate = false) => {
    if (!populate) return EpisodeModel.find();

    return EpisodeModel.aggregate([
      {
        $lookup: {
          from: "seasons",
          localField: "seasonId",
          foreignField: "_id",
          as: "seasonData",
        },
      },
      {
        $lookup: {
          from: "series",
          localField: "seasonData.seriesId",
          foreignField: "_id",
          as: "seriesData",
        },
      },
      {
        $addFields: {
          season: { $arrayElemAt: ["$seasonData", 0] },
          series: { $arrayElemAt: ["$seriesData", 0] },
        },
      },
      {
        $project: {
          seasonData: 0,
          seriesData: 0,
        },
      },
    ]);
  },

  getBySeasonId: async (seasonId, populate = false) => {
    const objectId = new mongoose.Types.ObjectId(seasonId); 

    if (!populate) {
      return EpisodeModel.find({ seasonId: objectId }); 
    }

    return EpisodeModel.aggregate([
      { $match: { seasonId: objectId } }, 
      {
        $lookup: {
          from: "seasons",
          localField: "seasonId",
          foreignField: "_id",
          as: "seasonData",
        },
      },
      {
        $lookup: {
          from: "series",
          localField: "seasonData.seriesId",
          foreignField: "_id",
          as: "seriesData",
        },
      },
      {
        $addFields: {
          season: { $arrayElemAt: ["$seasonData", 0] },
          series: { $arrayElemAt: ["$seriesData", 0] },
        },
      },
      {
        $project: {
          seasonData: 0,
          seriesData: 0,
        },
      },
    ]);
  },

  getById: async (id) => {
    return EpisodeModel.findById(id);
  },

  create: async (body) => {
   
    body.seasonId = new mongoose.Types.ObjectId(body.seasonId);

    return EpisodeModel.create(body);
  },

  update: async (id, updatedData) => {
    if (updatedData.seasonId) {
      updatedData.seasonId = new mongoose.Types.ObjectId(updatedData.seasonId);
    }

    return await EpisodeModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  },

  delete: async (id) => {
    return await EpisodeModel.findByIdAndDelete(id);
  },
};