import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { ContentWidth, FlexColumn } from "../CustomComponents/BasicComponents";
import CheckoutForm from "../Form/CheckoutForm";
import Shoe from "../../types/Shoe";
import Cookies from "js-cookie";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutPage: React.FC = () => {
  const [cartShoes, setCartShoes] = useState<Shoe[]>([]);

  // get shoes from cookies
  useEffect(() => {
    const carts = JSON.parse(Cookies.get("cart") || "[]");
    setCartShoes(carts);
  }, []);

  return (
    <>
      <ContentWidth sx={{ justifyContent: "center" }}>
        <Typography variant="h3">Checkout</Typography>
      </ContentWidth>

      {cartShoes.length > 0 ? (
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
            <CheckoutSummary />
          </FlexColumn>
        </ContentWidth>
      ) : (
        <Typography variant="h5">No shoes in Cart</Typography>
      )}
    </>
  );
};

export default CheckoutPage;
