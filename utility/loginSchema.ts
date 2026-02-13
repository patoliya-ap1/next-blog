import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 or more character")
    .max(10, "Password must be 10 or less character")
    .required("Password is required"),
});
