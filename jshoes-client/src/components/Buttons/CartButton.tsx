import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Shoe from "../../types/Shoe";
import { StyledButton } from "../CustomComponents/BasicComponents";

const CartButton: React.FC<Shoe> = ({
  id,
  name,
  price,
  brand,
  color,
  type,
  image,
}) => {
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(Cookies.get("cart") || "[]");
    setIsCart(cartItems.some((shoe: Shoe) => shoe.id === id));
  }, [id]);

  const toggleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItems = JSON.parse(Cookies.get("cart") || "[]");
    let updatedCartItems;

    if (isCart) {
      updatedCartItems = cartItems.filter((shoe: Shoe) => shoe.id !== id);
    } else {
      updatedCartItems = [
        ...cartItems,
        { id, name, price, brand, color, type, image },
      ];
    }

    Cookies.set("cart", JSON.stringify(updatedCartItems), { expires: 7 });
    // Dispatch the custom event to notify of cart changes
    window.dispatchEvent(new Event("cartUpdated"));
    setIsCart(!isCart);
  };

  return (
    <StyledButton onClick={toggleAddToCart}>
      {isCart ? "In Cart" : "Add to Cart"}
    </StyledButton>
  );
};

export default CartButton;
