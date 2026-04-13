import { SeasonModel } from "../models/index.js";

import mongoose from 'mongoose';

export const SeasonService = {
  getAll: async (populate = false) => {
    if (!populate) return SeasonModel.find();
    return SeasonModel.aggregate([
      {
        $lookup: {
          from: 'series',
          localField: 'seriesId',
          foreignField: '_id',
          as: 'seriesData'
        }
      },
      {
        $lookup: {
          from: 'episodes',
          localField: '_id',
          foreignField: 'seasonId',
          as: 'episodes'
        }
      },
      {
        $addFields: {
          series: { $arrayElemAt: ['$seriesData', 0] },
          episodesCount: { $size: '$episodes' }
        }
      },
      {
        $project: {
          seriesData: 0,
          episodes: 0
        }
      }
    ]);
  },

  getBySeriesId: async (seriesId, populate = false) => {
    if (!populate) return SeasonModel.find({ seriesId });
    return SeasonModel.aggregate([
      { $match: { seriesId: mongoose.Types.ObjectId(seriesId) } },
      {
        $lookup: {
          from: 'series',
          localField: 'seriesId',
          foreignField: '_id',
          as: 'seriesData'
        }
      },
      {
        $lookup: {
          from: 'episodes',
          localField: '_id',
          foreignField: 'seasonId',
          as: 'episodes'
        }
      },
      {
        $addFields: {
          series: { $arrayElemAt: ['$seriesData', 0] },
          episodesCount: { $size: '$episodes' }
        }
      },
      {
        $project: {
          seriesData: 0,
          episodes: 0
        }
      }
    ]);
  },

  getById: async (id) => {
    return SeasonModel.findById(id);
  },

  getEpisodesBySeason: async (seasonId, populate = false) => {
    const EpisodeService = require('./episode.service');
    return await EpisodeService.getBySeasonId(seasonId, populate);
  },

  create: async (body) => {
    return SeasonModel.create(body);
  },
  update: async (id, updatedData) => {
    return await SeasonModel.findByIdAndUpdate(id, updatedData, { new: true });
  },
  delete: async (id) => {
    return await SeasonModel.findByIdAndDelete(id);
  },
};

