import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  FlexColumn,
  FlexRow,
  Image,
} from "../CustomComponents/BasicComponents";
import Shoe from "../../types/Shoe";
import Cookies from "js-cookie";
import { CartShoeBox } from "../CustomComponents/CartComponents";

const CheckoutSummary: React.FC = () => {
  const [checkoutShoes, setCheckoutShoes] = useState<Shoe[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  // get shoes from cookies
  useEffect(() => {
    const carts = JSON.parse(Cookies.get("cart") || "[]");
    setCheckoutShoes(carts);
  }, []);

  // calculate total price
  useEffect(() => {
    const newTotalPrice = checkoutShoes.reduce((sum, shoe) => {
      return sum + shoe.price * (shoe.quantity || 1);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [checkoutShoes]);

  // calculate total quantity
  useEffect(() => {
    const newTotalQuantity = checkoutShoes.reduce((sum, shoe) => {
      return sum + (shoe.quantity || 1);
    }, 0);
    setTotalQuantity(newTotalQuantity);
  }, [checkoutShoes]);

  return (
    <>
      <Typography variant="h5">Order Summary</Typography>
      <FlexRow>
        <Typography>Total Items</Typography>
        <Typography> {totalQuantity} </Typography>
      </FlexRow>
      <FlexRow>
        <Typography>Total Price</Typography>
        <Typography>${totalPrice}</Typography>
      </FlexRow>
      {checkoutShoes.map((shoe) => (
        <FlexRow key={shoe.id}>
          <CartShoeBox
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={shoe.image}
                alt={shoe.name}
                sx={{ maxWidth: "200px" }}
              />
            </Box>
            <FlexColumn sx={{ width: "70%", padding: "10px" }}>
              <Typography variant="h5">
                {shoe.name} ({shoe.quantity})
              </Typography>
              <Typography>
                {shoe.brand}, {shoe.type}, {shoe.color}
              </Typography>
              <Typography variant="h5">
                ${(shoe.price * (shoe.quantity || 1)).toFixed(2)}
              </Typography>
            </FlexColumn>
          </CartShoeBox>
        </FlexRow>
      ))}
    </>
  );
};

export default CheckoutSummary;
