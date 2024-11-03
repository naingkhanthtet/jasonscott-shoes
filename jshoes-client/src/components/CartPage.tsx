import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Shoe from "./Shoe";
import BackHome from "./BackHome";
import {
  ContentWidth,
  Image,
  FlexColumn,
  FlexRow,
  StyledButton,
} from "./CustomComponents/BasicComponents";
import { Typography, Box, IconButton, Select, MenuItem } from "@mui/material";
import { CartShoeBox } from "./CustomComponents/CartComponents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteButton from "./FavoriteButton";

const CartPage: React.FC = () => {
  const [cartShoes, setCartShoes] = useState<Shoe[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const carts = JSON.parse(Cookies.get("cart") || "[]");
    setCartShoes(carts);

    const savedQuantities = JSON.parse(Cookies.get("quantities") || "{}");
    const initialQuantities = carts.reduce(
      (acc: { [key: string]: number }, shoe: Shoe) => {
        acc[shoe.id] = savedQuantities[shoe.id] || 1;
        return acc;
      },
      {}
    );
    setQuantities(initialQuantities);
  }, []);

  // Calculate total price based on quantities
  useEffect(() => {
    const newTotalPrice = cartShoes.reduce((sum, shoe) => {
      const quantity = quantities[shoe.id] || 1;
      return sum + shoe.price * quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartShoes, quantities]);

  const handleRemoveShoe = (id: number) => {
    const updatedCartShoes = cartShoes.filter((shoe) => shoe.id !== id);
    setCartShoes(updatedCartShoes);
    Cookies.set("cart", JSON.stringify(updatedCartShoes)); // Update cookie

    // Remove cookies quantity when cart item is removed
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id];
    setQuantities(updatedQuantities);
    window.dispatchEvent(new Event("cartUpdated"));
    Cookies.set("quantities", JSON.stringify(updatedQuantities));
  };

  // Function to handle quantity change
  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedQuantities = {
      ...quantities,
      [id]: quantity,
    };
    setQuantities(updatedQuantities);
    Cookies.set("quantities", JSON.stringify(updatedQuantities));
  };

  return (
    <>
      <BackHome />
      <ContentWidth sx={{ padding: "20px" }}>
        <Typography variant="h4">Your Cart</Typography>
      </ContentWidth>

      <ContentWidth
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
        }}
      >
        {cartShoes.length > 0 ? (
          <>
            {/* Shoe Boxes */}
            <FlexColumn sx={{ width: { xs: "100%", md: "60%" }, gap: "10px" }}>
              {cartShoes.map((cartShoe) => (
                <CartShoeBox
                  key={cartShoe.id}
                  sx={{
                    display: "flex",
                    padding: "10px",
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
                      sx={{ maxWidth: "300px" }}
                    />
                  </Box>

                  {/* Content section */}
                  <FlexColumn sx={{ width: "60%", padding: "10px" }}>
                    <Typography variant="h5">{cartShoe.name}</Typography>
                    <Typography>
                      {cartShoe.brand}, {cartShoe.type}, {cartShoe.color}
                    </Typography>
                    <Typography variant="h5">
                      ${cartShoe.price * (quantities[cartShoe.id] || 1)}
                    </Typography>
                  </FlexColumn>

                  {/* Icons section */}
                  <FlexColumn sx={{ width: "10%", alignItems: "center" }}>
                    <IconButton onClick={() => handleRemoveShoe(cartShoe.id)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    <FavoriteButton
                      id={cartShoe.id}
                      name={cartShoe.name}
                      price={cartShoe.price}
                      image={cartShoe.image}
                    />
                    <Select
                      value={quantities[cartShoe.id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          cartShoe.id,
                          parseInt(e.target.value as string)
                        )
                      }
                      size="small"
                      sx={{
                        borderRadius: "0px",
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FlexColumn>
                </CartShoeBox>
              ))}
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
                  {Object.values(quantities).reduce((acc, qty) => acc + qty, 0)}
                </Typography>
              </FlexRow>
              <FlexRow>
                <Typography>Total Price</Typography>
                <Typography>${totalPrice}</Typography>
              </FlexRow>
              <StyledButton>Checkout</StyledButton>
            </FlexColumn>
          </>
        ) : (
          <Typography variant="h5">No shoes in Cart</Typography>
        )}
      </ContentWidth>
    </>
  );
};

export default CartPage;
