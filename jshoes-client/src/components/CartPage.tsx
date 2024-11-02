import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Shoe from "./Shoe";
import BackHome from "./BackHome";
import {
  ContentWidth,
  WrapContainer,
} from "./CustomComponents/BasicComponents";
import { Typography } from "@mui/material";
import ShoeCard from "./ShoeCard";

const CartPage: React.FC = () => {
  const [cartShoes, setCartShoes] = useState<Shoe[]>([]);
  useEffect(() => {
    const carts = JSON.parse(Cookies.get("cart") || "[]");
    setCartShoes(carts);
  }, []);

  return (
    <>
      <BackHome />
      <ContentWidth sx={{ padding: "20px" }}>
        <Typography variant="h4">Your Cart</Typography>
      </ContentWidth>
      <WrapContainer
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {cartShoes.length > 0 ? (
          cartShoes.map((cartShoe) => (
            <ShoeCard
              key={cartShoe.id}
              id={cartShoe.id}
              name={cartShoe.name}
              price={cartShoe.price}
              image={cartShoe.image}
            />
          ))
        ) : (
          <Typography variant="h5">No shoes in Cart</Typography>
        )}
      </WrapContainer>
    </>
  );
};

export default CartPage;
