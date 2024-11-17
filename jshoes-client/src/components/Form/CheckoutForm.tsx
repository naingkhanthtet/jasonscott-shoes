import React from "react";
import { MenuItem, Typography, Box } from "@mui/material";
import { StyledButton } from "../CustomComponents/BasicComponents";
import {
  StyledSelect,
  StyledTextarea,
} from "../CustomComponents/FormComponents";
import validationSchema from "./validationSchema";
import { useFormik } from "formik";

const CheckoutForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      division: "",
      city: "",
      country: "",
      addressLine1: "",
      addressLine2: "",
      optionalAddress: "",
      paymentOption: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.table(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Email */}
        <StyledTextarea
          label="Email"
          type="email"
          name="email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* First Name */}
        <StyledTextarea
          label="First Name"
          name="firstName"
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />

        {/* Last Name */}
        <StyledTextarea
          label="Last Name"
          name="lastName"
          fullWidth
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />

        {/* Division */}
        <StyledTextarea
          label="Division"
          name="division"
          fullWidth
          value={formik.values.division}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.division && Boolean(formik.errors.division)}
          helperText={formik.touched.division && formik.errors.division}
        />

        {/* City */}
        <StyledTextarea
          label="City"
          name="city"
          fullWidth
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />

        {/* Country */}
        <StyledTextarea
          label="Country"
          name="country"
          fullWidth
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />

        {/* Address Line 1 */}
        <StyledTextarea
          label="House no, Street name"
          name="addressLine1"
          fullWidth
          value={formik.values.addressLine1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)
          }
          helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
        />

        {/* Address Line 2 */}
        <StyledTextarea
          label="Building name, floor"
          name="addressLine2"
          fullWidth
          value={formik.values.addressLine2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)
          }
          helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
        />

        {/* Optional Address */}
        <StyledTextarea
          label="Optional Address"
          name="optionalAddress"
          fullWidth
          value={formik.values.optionalAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.optionalAddress &&
            Boolean(formik.errors.optionalAddress)
          }
          helperText={
            formik.touched.optionalAddress && formik.errors.optionalAddress
          }
        />

        {/* Payment Option */}
        <StyledSelect
          fullWidth
          displayEmpty
          name="paymentOption"
          value={formik.values.paymentOption}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.paymentOption && Boolean(formik.errors.paymentOption)
          }
        >
          <MenuItem value="" disabled>
            Payment Option
          </MenuItem>
          <MenuItem value="mastercard">Mastercard</MenuItem>
          <MenuItem value="paypal">PayPal</MenuItem>
          <MenuItem value="cash">Cash on Delivery</MenuItem>
        </StyledSelect>
        {formik.touched.paymentOption && formik.errors.paymentOption && (
          <Typography color="error" variant="caption">
            {formik.errors.paymentOption}
          </Typography>
        )}

        {/* Submit Button */}
        <StyledButton fullWidth sx={{ marginTop: 3 }}>
          Submit
        </StyledButton>
      </Box>
    </form>
  );
};

export default CheckoutForm;
