import { SeriesService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const SeriesController = {
  getAll: async (req, res) => {
    try {
      const { populate } = req.query;
      const data = await SeriesService.getAll(populate === 'true');
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const data = await SeriesService.getById(req.params.id);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Series not found");
      }
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getSeasonsBySeries: async (req, res) => {
    try {
      const data = await SeriesService.getSeasonsBySeries(req.params.id);
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getGenresBySeries: async (req, res) => {
    try {
      const data = await SeriesService.getGenresBySeries(req.params.id);
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const seriesData = {
        ...req.body,
        poster: req.file ? `/uploads/${req.file.filename}` : null,
      };
      const data = await SeriesService.create(seriesData);
      return httpResponse.CREATED(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL params
      const updatedData = req.body; // Get updated data from request body

      const data = await SeriesService.update(id, updatedData);
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
      const data = await SeriesService.delete(id);

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
