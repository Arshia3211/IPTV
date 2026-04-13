import { GenreSeriesService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const GenreSeriesController = {
  getAll: async (req, res) => {
    try {
      const data = await GenreSeriesService.getAll();
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { genreId, seriesId } = req.body;
      if (!genreId || !seriesId) {
        return httpResponse.BAD_REQUEST(
          res,
          "Both genreId and seriesId are required."
        );
      }

      const data = await GenreSeriesService.create(req.body);
      return httpResponse.CREATED(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL params
      const updatedData = req.body; // Get updated data from request body

      const data = await GenreSeriesService.update(id, updatedData);
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
      const data = await GenreSeriesService.delete(id);

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
