import React from "react";
import { Typography, Select, MenuItem } from "@mui/material";
import { ContentWidth } from "../CustomComponents/BasicComponents";
import { FlexColumn, FlexRow } from "../CustomComponents/BasicComponents";
import { StyledTextarea } from "../CustomComponents/FormComponents";
import validationSchema from "./validationSchema";
import { useFormik } from "formik";

const CheckoutPage: React.FC = () => {
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
    <>
      <ContentWidth sx={{ justifyContent: "center" }}>
        <Typography variant="h3">Checkout</Typography>
      </ContentWidth>

      <ContentWidth
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
        }}
      >
        {/* Shoe Boxes */}
        <FlexColumn sx={{ width: { xs: "100%", md: "60%" }, gap: "10px" }}>
          <form onSubmit={formik.handleSubmit}></form>
          <StyledTextarea
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
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
            helperText={
              formik.touched.addressLine1 && formik.errors.addressLine1
            }
          />
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
            helperText={
              formik.touched.addressLine2 && formik.errors.addressLine2
            }
          />
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
          <Select
            fullWidth
            displayEmpty
            name="paymentOption"
            value={formik.values.paymentOption}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.paymentOption &&
              Boolean(formik.errors.paymentOption)
            }
          >
            <MenuItem value="" disabled>
              Payment Option
            </MenuItem>
            <MenuItem value="mastercard">Mastercard</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
            <MenuItem value="cash">Cash on Delivery</MenuItem>
          </Select>
          {formik.touched.paymentOption && formik.errors.paymentOption && (
            <Typography color="error" variant="caption">
              {formik.errors.paymentOption}
            </Typography>
          )}
        </FlexColumn>

        {/* Summary Section */}
        <FlexColumn
          sx={{
            width: { xs: "100%", md: "40%" },
            padding: "10px",
            gap: "20px",
          }}
        >
          <Typography variant="h5">Order Summary</Typography>

          <FlexRow>
            <Typography>Total Items</Typography>
            <Typography>
              {/* {Object.values(quantities).reduce((acc, qty) => acc + qty, 0)} */}
            </Typography>
          </FlexRow>
          <FlexRow>
            {/* <Typography>Total Price</Typography> */}
            {/* <Typography>${totalPrice}</Typography> */}
          </FlexRow>
        </FlexColumn>
      </ContentWidth>
    </>
  );
};

export default CheckoutPage;
