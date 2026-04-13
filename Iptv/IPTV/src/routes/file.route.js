import express from "express";
import { uploadFile } from "../middleware/multer.js";
import { FileController } from "../controllers/index.js";
import { FileValidationSchema } from "../validations/file.validation.js";
import { validate } from "../middleware/index.js";

const router = express.Router();
router.get("/", FileController.getAll);
router.post("/upload", uploadFile.single("file"), FileController.upload);

router.patch(
  "/:id",
  validate(FileValidationSchema.update),
  FileController.update
);

router.delete("/:id", FileController.delete);

export default router;
