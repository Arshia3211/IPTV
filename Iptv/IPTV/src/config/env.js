// load environment variables from .env file
import "dotenv/config";

export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.DB_URI || "mongodb://127.0.0.1:27017/IPTV",
  jwtSecret: process.env.JWT_SECRET || "my_temporary_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15d",
};