import express from "express";
import { SeasonValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { uploadImage } from "../middleware/multer.js";
import { SeasonController } from "../controllers/index.js";

const router = express.Router();

router.get("/", SeasonController.getAll);

router.get("/season/:id", SeasonController.getById);

router.get("/season/:id/episodes", SeasonController.getSeasonsBySeries);

router.post(
  "/create",
  validate(SeasonValidationSchema.create),
  uploadImage.single('image'),
  SeasonController.create
);

router.patch(
  "/season/:id",
  validate(SeasonValidationSchema.update),
  SeasonController.update
);

router.delete("/season/:id", SeasonController.delete);

export default router;
