import * as yup from "yup";
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});
const registerValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Fullname is required")
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid full name"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits"),
  email: yup.string().email("Invalid email").required("Email is required"),
  verifyMethod: yup
    .string()
    .notOneOf(["default"], "Please choose a verify method")
    .required("Verify method is required"),
});
export default {
  loginValidationSchema,
  registerValidationSchema,
};
