import jwt from "jsonwebtoken";
import { userModel } from "../models/index.js";
import config from "../config/index.js";

export const UserService = {
  getAll: async () => {
    return userModel.find();
  },

  getById: async (id) => {
    return userModel.findById(id);
  },

  findByEmail: async (email) => {
    return userModel.findOne({ email });
  },

  register: async (body) => {
    const user = await userModel.create(body);
    const token = jwt.sign({ id: user._id }, "mysecretkey", {
      expiresIn: "1d",
    });
    return {
      user,
      token,
    };
  },

  update: async (id, body) => {
    const updatedUser = await userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (body.password) {
      // If password is updated, generate new token
      const token = jwt.sign({ id: updatedUser._id }, "mysecretkey", {
        expiresIn: "1d",
      });
      return {
        user: updatedUser,
        token,
      };
    }
    return updatedUser;
  },

  delete: async (id) => {
    return userModel.findByIdAndDelete(id);
  },

  login: async ({ email, password }) => {
    const user = await userModel.findOne({ email });

    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: user._id }, config.env.jwtSecret, {
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  },
};
