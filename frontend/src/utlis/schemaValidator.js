import * as Yup from "yup";

export const registerUserSchemaValidator = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const loginUserSchemaValidator = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const profileSchemaValidator = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  profilePicture: Yup.mixed()
    .test("fileType", "Profile picture is required", (value) => {
      return value.length !== 0;
    })
    .test("fileSize", "File is too large", (value) => {
      return value ? value.size <= 2 * 1024 * 1024 : true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      return value
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        : true;
    }),
});
