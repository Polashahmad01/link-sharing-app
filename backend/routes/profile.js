import express from "express";
import profileValidator from "../utils/profileValidation.js";
import profileController from "../controllers/profile.js";
const router = express.Router();

router.post(
  "/v1/profile",
  profileValidator.validateProfileRoute(),
  profileController.createProfile
);

export default router;
