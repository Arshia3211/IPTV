import { Genre, GenreSeriesModel, SeriesModel, SeasonModel } from "../models/index.js";

export const GenreService = {

  getAll: async (populate = false) => {
    if (!populate) return Genre.find();
    return Genre.aggregate([
      { // genre ko related series k sth join kr rha h
        $lookup: {
          from: 'genreseries',
          localField: '_id',
          foreignField: 'genreId',
          as: 'genreRelations'
        }
      },
      { // actual series ka data
        $lookup: {
          from: 'series',
          localField: 'genreRelations.seriesId',
          foreignField: '_id',
          as: 'series'
        }
      },
      {   // simplifying every series object to only have id and title
        $addFields: {
          series: { $map: {
            input: '$series',
            as: 's',
            in: { id: '$$s._id', title: '$$s.title' }
          }}
        }
      },
      { // unwanted field removed
        $project: {
          genreRelations: 0
        }
      }
    ]);
  },

  getById: async (id) => {
    return Genre.findById(id);
  },

  getSeriesByGenre: async (genreId, populate = false) => {
    if (!populate) {
      const relations = await GenreSeriesModel.find({ genreId }).select("seriesId -_id");
      const seriesIds = relations.map((r) => r.seriesId);
      if (!seriesIds.length) return [];
      return SeriesModel.find({ _id: { $in: seriesIds } });
    }
    return GenreSeriesModel.aggregate([
      { $match: { genreId: mongoose.Types.ObjectId(genreId) } },
      {
        $lookup: {
          from: 'series',
          localField: 'seriesId',
          foreignField: '_id',
          as: 'seriesData'
        }
      },
      {
        $unwind: '$seriesData'
      },
      {
        $replaceRoot: { newRoot: '$seriesData' }
      }
    ]);
  },

  getSeasonsByGenre: async (genreId, populate = false) => {
    if (!populate) {
      const relations = await GenreSeriesModel.find({ genreId }).select("seriesId -_id");
      const seriesIds = relations.map((r) => r.seriesId);
      if (!seriesIds.length) return [];
      return SeasonModel.find({ seriesId: { $in: seriesIds } });
    }
    return GenreSeriesModel.aggregate([
      { $match: { genreId: mongoose.Types.ObjectId(genreId) } },
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
          from: 'seasons',
          localField: 'seriesId',
          foreignField: 'seriesId',
          as: 'seasons'
        }
      },
      {
        $addFields: {
          series: { $arrayElemAt: ['$seriesData', 0] }
        }
      },
      {
        $project: {
          seriesData: 0,
          _id: 0
        }
      },
      { $unwind: '$seasons' },
      {
        $replaceRoot: { newRoot: '$seasons' }
      }
    ]);
  },

  create: async (body) => {
    return Genre.create(body);
  },

  update: async (id, body) => {
    return await Genre.findByIdAndUpdate(id, body, { new: true });
  },

  delete: async (id) => {
    return await Genre.findByIdAndDelete(id);
  },
};