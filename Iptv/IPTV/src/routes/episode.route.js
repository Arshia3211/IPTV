import express from "express";
import { EpisodeValidationSchema } from "../validations/index.js";
import { validate , authenticate } from "../middleware/index.js";
import { uploadImage } from "../middleware/multer.js";
import { EpisodeController } from "../controllers/index.js";
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const router = express.Router();

router.get("/", EpisodeController.getAll);

router.get("/episode/season/:seasonId", EpisodeController.getBySeasonId);

router.post(
  "/",
  validate(EpisodeValidationSchema.create),
  uploadImage.single("poster"),
  EpisodeController.create
);

router.patch(
  "/:id",
  validate(EpisodeValidationSchema.update),
  uploadImage.single("poster"),
  EpisodeController.update
);

router.delete("/:id", EpisodeController.delete);


export default router;
