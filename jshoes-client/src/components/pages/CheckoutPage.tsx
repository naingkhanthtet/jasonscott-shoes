import React from "react";
import { Typography } from "@mui/material";
import {
  ContentWidth,
  FlexColumn,
  FlexRow,
} from "../CustomComponents/BasicComponents";
import CheckoutForm from "../Form/CheckoutForm";

const CheckoutPage: React.FC = () => {
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
        {/* Form Section */}
        <FlexColumn sx={{ width: { xs: "100%", md: "60%" } }}>
          <CheckoutForm />
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
            <Typography> {/* Quantity Logic */} </Typography>
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
