import express from "express";
import linkValidator from "../utils/linkValidation.js";
import linkController from "../controllers/link.js";
const router = express.Router();

router.post(
  "/v1/link",
  linkValidator.validateLinkCreateRoute(),
  linkController.createNewLink
);

router.delete(
  "/v1/link",
  linkValidator.validateDeleteLinkRoute(),
  linkController.deleteLink
);

export default router;
