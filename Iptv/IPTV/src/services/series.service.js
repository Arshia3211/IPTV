import { GenreSeriesModel, SeasonModel, SeriesModel } from "../models/index.js";

export const SeriesService = {
  getAll: async (populate = false) => {
    if (!populate) return SeriesModel.find();
    return SeriesModel.aggregate([
      {
        $lookup: {
          from: 'genreseries',
          localField: '_id',
          foreignField: 'seriesId',
          as: 'genreRelations'
        }
      },
      {
        $lookup: {
          from: 'genres',
          localField: 'genreRelations.genreId',
          foreignField: '_id',
          as: 'genres'
        }
      },
      {
        $addFields: {
          genres: { $map: {
            input: '$genres',
            as: 'genre',
            in: '$$genre.name'
          }}
        }
      },
      {
        $project: {
          genreRelations: 0
        }
      }
    ]);
  },

  getById: async (id) => {
    return SeriesModel.findById(id);
  },

  getSeasonsBySeries: async (seriesId) => {
    return SeasonModel.find({ seriesId });
  },

  getGenresBySeries: async (seriesId) => {
    return GenreSeriesModel.find({ seriesId });
  },

  create: async (body) => {
    return SeriesModel.create(body);
  },
  update: async (id, updatedData) => {
    return await SeriesModel.findByIdAndUpdate(id, updatedData, { new: true });
  },
  delete: async (id) => {
    return await SeriesModel.findByIdAndDelete(id);
  },
};
