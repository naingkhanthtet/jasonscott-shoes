import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Shoe from "../../types/Shoe";
import { useUser } from "../../utils/useUser";
import Cookies from "js-cookie";

const FavoriteButton: React.FC<Shoe> = ({ id, name, price, image }) => {
  const { user, handleAddFavorites, handleRemoveFavorites } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  // set is favorite value from favorites cookies
  useEffect(() => {
    const favoritesFromCookies = JSON.parse(Cookies.get("favorites") || "[]");
    const favoriteExists = favoritesFromCookies.some(
      (shoe: Shoe) => shoe.id === id
    );
    setIsFavorite(favoriteExists);
  }, [user.favorites, id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
      handleRemoveFavorites(id);
    } else {
      handleAddFavorites({ id, name, price, image });
    }

    window.dispatchEvent(new Event("favoritesUpdated"));
    setIsFavorite(!isFavorite);
  };

  return (
    <IconButton onClick={toggleFavorite}>
      {isFavorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
