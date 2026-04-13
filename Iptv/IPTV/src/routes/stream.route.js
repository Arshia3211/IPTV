import express from "express";
import { StreamValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { StreamController } from "../controllers/index.js";

const router = express.Router();

router.get("/streams", StreamController.getAll);

router.get("/streams/:id", StreamController.getById);

router.get("/streams/:id/episodes", StreamController.getEpisodesByStream);

router.get("/streams/:id/user", StreamController.getEpisodeByStream);

router.get("/streams/:id/episode/season", StreamController.getEpisodeByStream);

router.get("/streams/:id/episode/season/series", StreamController.getEpisodeByStream);

router.get("/streams/:id/episode/season/series/genres", StreamController.getEpisodeByStream);

router.post(
  "/streams",
  validate(StreamValidationSchema.create),
  StreamController.create
);
router.patch(
  "/streams/:id",
  validate(StreamValidationSchema.update),
  StreamController.update
);

router.delete("/streams/:id", StreamController.delete);

export default router;
