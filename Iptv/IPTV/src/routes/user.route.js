import express from "express";
// import the controller from the correct file (or from the controllers index)
import { userController } from "../controllers/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { UserValidationSchema } from "../validations/index.js";

const router = express.Router();
router.get("/", userController.getAll);

router.post(
  "/register",
  validate(UserValidationSchema.register),
  userController.register
);

router.post(
  "/login",
  validate(UserValidationSchema.login),
  userController.login
);
// only authenticated users can update or delete their profile
  router.patch("/:id", authenticate,
  validate(UserValidationSchema.update),
  userController.update
);

router.delete("/:id", authenticate, userController.delete);

export default router;