import { StreamModel } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

export const StreamService = {
  getAll: async () => {
    return StreamModel.find();
  },

  getById: async (id) => {
    return StreamModel.findById(id);
  },

  getEpisodesByStream: async (streamId) => {
  
    return StreamModel.find({ _id: streamId });
  },

  getEpisodeByStream: async (streamId) => {
  
    return StreamModel.find({ _id: streamId });
  },

  create: async (body) => {
    return StreamModel.create(body);
  },

  update: async (id, updatedData) => {
    return await StreamModel.findByIdAndUpdate(id, updatedData, { new: true });
  },
  delete: async (id) => {
    return await StreamModel.findByIdAndDelete(id);
  },
};
