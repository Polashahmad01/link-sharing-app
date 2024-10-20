import express from "express";
import userController from "../controllers/user.js";
import userValidator from "../utils/userValidation.js";
const router = express.Router();

router.post(
  "/v1/register",
  userValidator.validateUserRegisterRoute(),
  userController.createUser
);

router.post(
  "/v1/login",
  userValidator.validateUserLoginRoute(),
  userController.loginUser
);

router.post(
  "/v1/user",
  userValidator.validateGetSingleUserRoute(),
  userController.getSingleUser
);

export default router;
