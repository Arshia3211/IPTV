import express from "express";
import userRoute from "./user.route.js";
import genreRoute from "./genre.route.js";
import seriesRoute from "./series.route.js";
import seasonRoute from "./season.route.js"; 
import episodeRoute from "./episode.route.js"; 
import streamRoute from "./stream.route.js";
import genreSeriesRoute from "./genreSeries.route.js";
import fileRoute from "./file.route.js";


const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

unProtectedRouter.use("/user", userRoute);
unProtectedRouter.use("/genre", genreRoute);
unProtectedRouter.use("/series", seriesRoute);
unProtectedRouter.use("/season", seasonRoute);
unProtectedRouter.use("/episode", episodeRoute);
unProtectedRouter.use("/stream", streamRoute);
unProtectedRouter.use("/genreSeries", genreSeriesRoute);
unProtectedRouter.use("/file", fileRoute);

// protectedRouter
export { protectedRouter, unProtectedRouter };
