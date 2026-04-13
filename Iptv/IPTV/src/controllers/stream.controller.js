import { StreamService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const StreamController = {
  getAll: async (req, res) => {
    try {
      const data = await StreamService.getAll();
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const data = await StreamService.getById(req.params.id);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Stream not found");
      }
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getEpisodesByStream: async (req, res) => {
    try {
      const data = await StreamService.getEpisodesByStream(req.params.id);
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getEpisodeByStream: async (req, res) => {
    try {
      const data = await StreamService.getEpisodeByStream(req.params.id);
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const data = await StreamService.create(req.body);
      return httpResponse.CREATED(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL params
      const updatedData = req.body; // Get updated data from request body

      const data = await StreamService.update(id, updatedData);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Stream are not found");
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
      const data = await StreamService.delete(id);

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
