import { body } from "express-validator";

const validateUserRegisterRoute = () => {
  return [
    body("firstName", "First name cannot be empty.").trim().notEmpty(),
    body("lastName", "Last name cannot be empty.").trim().notEmpty(),
    body("email", "Invalid email address").trim().isEmail(),
    body("password", "Password cannot be empty.").trim().notEmpty(),
  ];
};

const validateUserLoginRoute = () => {
  return [
    body("email", "Invalid email address").trim().isEmail(),
    body("password", "Password cannot be empty.").trim().notEmpty(),
  ];
};

export default {
  validateUserRegisterRoute,
  validateUserLoginRoute,
};
