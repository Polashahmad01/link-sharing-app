import { body } from "express-validator";

const validateLinkCreateRoute = () => {
  return [
    body("_id", "_id cannot be empty.").notEmpty(),
    body("items", "Items must an array.").isArray(),
  ];
};

const validateDeleteLinkRoute = () => {
  return [
    body("_id", "_id cannot be empty.").notEmpty(),
    body("linkId", "linkId cannot be empty.").notEmpty(),
  ];
};

export default {
  validateLinkCreateRoute,
  validateDeleteLinkRoute,
};
