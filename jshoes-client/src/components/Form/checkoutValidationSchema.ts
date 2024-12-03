import * as Yup from "yup";

const checkoutValidationSchema = Yup.object({
  // User validation
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  division: Yup.string().required("Division is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  addressLine1: Yup.string().required("House No, Street Name is required"),
  // addressLine2: Yup.string().required("Building name, floor is required"),
  paymentOption: Yup.string().required("Payment option is required"),
});

export default checkoutValidationSchema;
