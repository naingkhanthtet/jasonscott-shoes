import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Shoe from "../../types/Shoe";
import { useUser } from "../../utils/useUser";

const FavoriteButton: React.FC<Shoe> = ({ id, name, price, image }) => {
  const { user, handleAddFavorites, handleRemoveFavorites } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    setIsFavorite(user.favorites.some((shoe: Shoe) => shoe.id === id));
  }, [user.favorites, id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    // const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    // let updatedFavorites;

    if (isFavorite) {
      // updatedFavorites = favorites.filter((shoe: Shoe) => shoe.id !== id);
      handleRemoveFavorites(id);
    } else {
      // updatedFavorites = [...favorites, { id, name, price, image }];
      handleAddFavorites({ id, name, price, image });
    }

    // Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 7 });

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
