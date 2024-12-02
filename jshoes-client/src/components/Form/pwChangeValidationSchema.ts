import * as Yup from "yup";

const pwChangeValidationSchema = Yup.object({
  old_password: Yup.string().required("Old Password is required"),
  new_password: Yup.string()
    .required("New Password is required")
    .min(8, "Must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/\d/, "Must contain a number")
    .matches(/[!@#$%^&*]/, "Must contain a special character")
    .test(
      "not-same-as-old-password",
      "New password cannot be the same as the old password",
      function (value) {
        return value !== this.parent.old_password;
      }
    ),
  re_password: Yup.string()
    .oneOf([Yup.ref("new_password"), undefined], "Passwords must match")
    .required("Please re-enter your password"),
});

export default pwChangeValidationSchema;
