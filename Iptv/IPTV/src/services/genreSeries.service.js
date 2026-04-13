import { GenreSeriesModel } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";
export const GenreSeriesService = {
  getAll: async () => {
    return GenreSeriesModel.find();
  },

  create: async (body) => {
    return GenreSeriesModel.create(body);
  },
  update: async (id, updatedData) => {
    return await GenreSeriesModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  },
  delete: async (id) => {
    return await GenreSeriesModel.findByIdAndDelete(id);
  },
};
