import { UserService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const userController = {
  getAll: async (req, res) => {
    try {
      const data = await UserService.getAll();
      return httpResponse.SUCCESS(res, data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  register: async (req, res) => {
    try {
      const existingUser = await UserService.findByEmail(req.body.email);
      if (existingUser) {
        return httpResponse.BAD_REQUEST(res, "Email already registered");
      }
      const token = await UserService.register(req.body);
      return httpResponse.CREATED(res, token);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },

  login: async (req, res) => {
    try {
      const token = await UserService.login(req.body);
      return httpResponse.SUCCESS(res, token);
    } catch (error) {
      return httpResponse.UNAUTHORIZED(res, error.message);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL params
      const updatedData = req.body; // Get updated data from request body

      const data = await UserService.update(id, updatedData);
      if (!data) {
        return httpResponse.NOT_FOUND(res, "User not found");
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
      const data = await UserService.delete(id);

      if (!data) {
        return httpResponse.NOT_FOUND(res, "User not found");
      }

      return httpResponse.SUCCESS(res, "User deleted successfully");
    } catch (error) {
      console.error("Server Error:", error.message);
      return httpResponse.INTERNAL_SERVER_ERROR(res, error);
    }
  },
};
