import express from "express";
import { genreController } from "../controllers/index.js";
import { validate , authenticate } from "../middleware/index.js";
import { GenreValidationSchema } from "../validations/index.js";
const router = express.Router();

router.get("/", genreController.getAll);

router.get("/:id", genreController.getById);

router.get("/:id/series", genreController.getSeriesByGenre);

router.get("/:id/seasons", genreController.getSeasonsByGenre);

router.post(
  "/create",
  validate(GenreValidationSchema.create),
  genreController.create
);
router.patch(
  "/:id",
  validate(GenreValidationSchema.update),
  genreController.update
);
router.delete("/:id", genreController.delete);

export default router;