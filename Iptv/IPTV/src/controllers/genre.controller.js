import { GenreService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const genreController = {
  getAll: async (req, res) => {
    const { populate } = req.query;
    const data = await GenreService.getAll(populate === 'true');
    return httpResponse.SUCCESS(res, data);
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await GenreService.getById(id);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Genre not found");
      }
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      console.error("Server Error:", error.message);
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getSeriesByGenre: async (req, res) => {
    try {
      const { id } = req.params;
      const { populate } = req.query;
      const data = await GenreService.getSeriesByGenre(id, populate === 'true');
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      console.error("Server Error:", error.message);
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getSeasonsByGenre: async (req, res) => {
    try {
      const { id } = req.params;
      const { populate } = req.query;
      const data = await GenreService.getSeasonsByGenre(id, populate === 'true');
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      console.error("Server Error:", error.message);
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const data = await GenreService.create(req.body);
      return httpResponse.CREATED(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const data = await GenreService.update(id, updatedData);
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
      const data = await GenreService.delete(id);
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