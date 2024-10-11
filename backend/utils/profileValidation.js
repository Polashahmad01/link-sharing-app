import { body } from "express-validator";

const validateProfileRoute = () => {
  return [
    body("profilePicture", "Profile picture cannot be empty.").notEmpty(),
    body("firstName", "First name cannot be empty.").trim().notEmpty(),
    body("lastName", "Last name cannot be empty.").trim().notEmpty(),
    body("email", "Invalid email address").trim().isEmail(),
  ];
};

export default {
  validateProfileRoute,
};
