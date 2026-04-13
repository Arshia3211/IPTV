import { FileModel } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";
export const FileService = {
  getAll: async () => {
    return FileModel.find();
  },

  updateFile: async (fileData) => {
    return FileModel.create(fileData);
  },
  update: async (id, updatedData) => {
    return await FileModel.findByIdAndUpdate(id, updatedData, { new: true });
  },
  delete: async (id) => {
    return await FileModel.findByIdAndDelete(id);
  },
};
