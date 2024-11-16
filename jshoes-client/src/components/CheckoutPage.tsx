import React from "react";
import { Typography } from "@mui/material";
import { ContentWidth } from "./CustomComponents/BasicComponents";
import { FlexColumn, FlexRow } from "./CustomComponents/BasicComponents";
import { StyledTextarea } from "./CustomComponents/FormComponents";
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
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
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
