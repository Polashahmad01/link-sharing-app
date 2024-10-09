import express from "express";
import userController from "../controllers/user.js";
import userValidator from "../utils/userValidation.js";
const router = express.Router();

router.post("/v1/register", userValidator.validateUserRegisterRoute(), userController.createUser);

export default router;