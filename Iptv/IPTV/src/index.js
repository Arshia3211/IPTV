import {} from "dotenv/config";
import express from "express";
import loaders from "./loaders/index.js";
import { env } from "./config/env.js";
import mongoose from "mongoose";
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 

async function startServer() {
  const app = express();

  mongoose.set("strictQuery", false);

  await loaders.init({ expressApp: app });

  // Start server
  const server = app.listen(env.port, () =>
    console.log(`Server Started on port: ${env.port}`)
  );

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${env.port} is already in use!`);
      console.log("Try changing the PORT in your .env file or kill the existing process.");
      process.exit(1);
    } else {
      console.error("Server error:", err);
      process.exit(1);
    }
  });

  process.on("uncaughtException", (err) => {
    console.log("uncaughtException! Shutting down the server...");
    console.error(err);
    process.exit(1);
  });
  process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection! Shutting down the server...");
    console.error(err);
    server.close(() => process.exit(1));
  });
}
startServer();