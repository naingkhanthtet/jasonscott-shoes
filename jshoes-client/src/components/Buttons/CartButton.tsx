import React, { useEffect, useState } from "react";
import Shoe from "../../types/Shoe";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { useUser } from "../../utils/useUser";

const CartButton: React.FC<Shoe> = ({
  id,
  name,
  price,
  brand,
  color,
  type,
  image,
}) => {
  const { user, handleAddToCart, handleRemoveFromCart } = useUser();
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    setIsCart(user.cart.some((shoe: Shoe) => shoe.id === id));
  }, [user.cart, id]);

  const toggleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isCart) {
      handleRemoveFromCart(id);
    } else {
      handleAddToCart({ id, name, price, brand, color, type, image });
    }
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
