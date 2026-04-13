import { EpisodeService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const EpisodeController = {
  getAll: async (req, res) => {
    try {
      const { populate } = req.query;
      const data = await EpisodeService.getAll(populate === 'true');
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  getBySeasonId: async (req, res) => {
    try {
      const { seasonId } = req.params;
      const { populate } = req.query;

      console.log("SeasonId:", seasonId); // debug

      const data = await EpisodeService.getBySeasonId(
        seasonId,
        populate === 'true'
      );

      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      console.error("Server Error:", error.message);
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const episodeData = {
        ...req.body,
        thumbnail: req.file ? `/uploads/${req.file.filename}` : null,
      };

      const data = await EpisodeService.create(episodeData);
      return httpResponse.CREATED(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const data = await EpisodeService.update(id, updatedData);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Episode not found");
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

      const data = await EpisodeService.delete(id);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "Episode not found");
      }

      return httpResponse.SUCCESS(res, "Episode deleted successfully");
    } catch (error) {
      console.error("Server Error:", error.message);
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },
};