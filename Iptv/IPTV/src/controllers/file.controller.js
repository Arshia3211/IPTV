import { FileService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const FileController = {
  upload: async (req, res) => {
    try {
      if (!req.file) {
        return httpResponse.BAD_REQUEST(res, "No file uploaded");
      }

      const fileData = {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      };

      const updateFile = await FileService.updateFile(fileData);
      return httpResponse.CREATED(res, updateFile);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getAll: async (req, res) => {
    try {
      const files = await FileService.getAll();
      return httpResponse.SUCCESS(res, files);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params; 
      const updatedData = req.body; 

      const data = await FileService.update(id, updatedData);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Genre not found");
      }

      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      console.error("Server Error:", error.message);
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await FileService.delete(id);

      if (!data) {
        return httpResponse.NOT_FOUND(res, "Genre not found");
      }

      return httpResponse.SUCCESS(res, "Genre deleted successfully");
    } catch (error) {
      console.error("Server Error:", error.message);
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },
};
