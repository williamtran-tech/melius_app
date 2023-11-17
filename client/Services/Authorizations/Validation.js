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
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits"),
  email: yup.string().email("Invalid email").required("Email is required"),
  verifiedMethod: yup
    .string()
    .notOneOf(["default"], "Please choose a verify method")
    .required("Verify method is required"),
});
const agreeValidationSchema = yup.object().shape({
  checkboxValue: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
const OPTvalidationSchema = yup.object().shape({
  verifiedCode: yup
    .string()
    .required("Please enter the OTP code")
    .min(4, "OTP code must be 4 digits"),
});
const PasswordSettingSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const EmailOrPhoneSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .test("emailOrPhone", "Invalid email or phone number", (value) => {
      if (!value) return false;
      if (value.includes("@")) {
        // Validate email format
        return yup.string().email().isValidSync(value);
      } else if (value.match(/^[0-9]{10,15}$/, "Invalid phone number")) {
        // Validate phone number format
        return yup.string().required("Phone number is required");
      } else {
        return false;
      }
    })
    .required("Email or Phone is required"),
});
const validationProfileChildSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of Birth is required"),
  weight: yup.number().required("Weight is required"),
  height: yup.number().required("Height is required"),
});
const validationUpdateProfileChildSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of Birth is required"),
});
const registerUpdateProfileParentSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Fullname is required")
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid full name"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.date().required("Date of Birth is required"),
});
const validationChildRecordSchema = yup.object().shape({
  weight: yup.number().required("Weight is required"),
  height: yup.number().required("Height is required"),
});
export default {
  loginValidationSchema,
  registerValidationSchema,
  agreeValidationSchema,
  OPTvalidationSchema,
  PasswordSettingSchema,
  EmailOrPhoneSchema,
  validationProfileChildSchema,
  validationChildRecordSchema,
  validationUpdateProfileChildSchema,
  registerUpdateProfileParentSchema,
};
