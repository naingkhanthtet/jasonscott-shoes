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

const CheckoutDetails: React.FC = () => {
  const [cartShoes, setCartShoes] = useState<Shoe[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  // get shoes from cookies
  useEffect(() => {
    const carts = JSON.parse(Cookies.get("cart") || "[]");
    setCartShoes(carts);
  }, []);

  // calculate total price
  useEffect(() => {
    const newTotalPrice = cartShoes.reduce((sum, shoe) => {
      return sum + shoe.price * (shoe.quantity || 1);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartShoes]);

  // calculate total quantity
  useEffect(() => {
    const newTotalQuantity = cartShoes.reduce((sum, shoe) => {
      return sum + (shoe.quantity || 1);
    }, 0);
    setTotalQuantity(newTotalQuantity);
  }, [cartShoes]);

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
      {cartShoes.map((cartShoe) => (
        <FlexRow>
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
                src={cartShoe.image}
                alt={cartShoe.name}
                sx={{ maxWidth: "200px" }}
              />
            </Box>
            <FlexColumn sx={{ width: "70%", padding: "10px" }}>
              <Typography variant="h5">
                {cartShoe.name} ({cartShoe.quantity})
              </Typography>
              <Typography>
                {cartShoe.brand}, {cartShoe.type}, {cartShoe.color}
              </Typography>
              <Typography variant="h5">
                ${(cartShoe.price * (cartShoe.quantity || 1)).toFixed(2)}
              </Typography>
            </FlexColumn>
          </CartShoeBox>
        </FlexRow>
      ))}
    </>
  );
};

export default CheckoutDetails;
