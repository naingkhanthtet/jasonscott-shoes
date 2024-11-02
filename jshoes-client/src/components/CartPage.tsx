import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Shoe from "./Shoe";
import BackHome from "./BackHome";
import {
  ContentWidth,
  Image,
  FlexColumn,
} from "./CustomComponents/BasicComponents";
import { Typography, Box, IconButton } from "@mui/material";
import { CartShoeBox } from "./CustomComponents/CartComponents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteButton from "./FavoriteButton";

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

      <ContentWidth>
        <FlexColumn sx={{ gap: "10px", width: { xs: "100%", sm: "60%" } }}>
          {cartShoes.length > 0 ? (
            cartShoes.map((cartShoe) => (
              <CartShoeBox>
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
                    sx={{ maxWidth: "300px" }}
                  />
                </Box>
                {/* Content section */}
                <FlexColumn sx={{ width: "60%", padding: "10px" }}>
                  <Typography variant="h5">{cartShoe.name}</Typography>
                  <Typography>
                    {cartShoe.brand}, {cartShoe.type}, {cartShoe.color}
                  </Typography>
                  <Typography variant="h5">${cartShoe.price}</Typography>
                </FlexColumn>
                {/* Icons section */}
                <FlexColumn sx={{ width: "10%" }}>
                  <IconButton>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                  <FavoriteButton
                    id={cartShoe.id}
                    name={cartShoe.name}
                    price={cartShoe.price}
                    image={cartShoe.image}
                  />
                </FlexColumn>
              </CartShoeBox>
            ))
          ) : (
            <Typography variant="h5">No shoes in Cart</Typography>
          )}
        </FlexColumn>
        <FlexColumn
          sx={{
            width: {
              xs: "100%",
              sm: "40%",
            },
            padding: "10px",
          }}
        >
          <Typography variant="h5">Order summary</Typography>
        </FlexColumn>
      </ContentWidth>
    </>
  );
};

export default CartPage;
