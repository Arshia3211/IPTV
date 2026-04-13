import express from "express";
import { GenreSeriesValidationSchema } from "../validations/index.js";
import { validate } from "../middleware/index.js";
import { GenreSeriesController } from "../controllers/index.js";

const router = express.Router();

router.get("/", GenreSeriesController.getAll);

router.post(
  "/create",
  validate(GenreSeriesValidationSchema.create),
  GenreSeriesController.create
);
router.patch(
  "/:id",
  validate(GenreSeriesValidationSchema.update),
  GenreSeriesController.update
);

router.delete("/:id", GenreSeriesController.delete);

export default router;
