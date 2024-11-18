import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  division: Yup.string().required("Division is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  addressLine1: Yup.string().required("House No, Street Name is required"),
  paymentOption: Yup.string().required("Payment option is required"),
  // User validation
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/\d/, "Must contain a number")
    .matches(/[!@#$%^&*]/, "Must contain a special character"),
  re_password: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please re-enter your password"),
});

export default validationSchema;
