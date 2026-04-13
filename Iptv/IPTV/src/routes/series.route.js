import express from "express";
import { SeriesValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { uploadImage } from "../middleware/multer.js";
import { SeriesController } from "../controllers/series.controller.js";

const router = express.Router();
router.get("/", SeriesController.getAll);
router.get("/:id", SeriesController.getById);

router.get("/:id/season", SeriesController.getSeasonsBySeries);

router.get("/:id/season/:season/episodes", SeriesController.getGenresBySeries);

router.post(
  "/create",
  uploadImage.single('poster'),
  validate(SeriesValidationSchema.create),
  SeriesController.create
);

router.patch(
  "/:id",
  validate(SeriesValidationSchema.update),
  SeriesController.update
);

router.delete("/:id", SeriesController.delete);
export default router;
