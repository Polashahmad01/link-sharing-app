import { body } from "express-validator";

const validateLinkCreateRoute = () => {
  return [
    body("_id", "_id cannot be empty.").notEmpty(),
    body("items", "Items must an array.").isArray(),
  ];
};

export default {
  validateLinkCreateRoute,
};
