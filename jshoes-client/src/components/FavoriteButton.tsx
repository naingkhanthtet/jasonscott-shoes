import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

interface FavoriteButtonProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  name,
  price,
  imageUrl,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    setIsFavorite(
      favorites.some((shoe: FavoriteButtonProps) => shoe.id === id)
    );
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (shoe: FavoriteButtonProps) => shoe.id !== id
      );
    } else {
      updatedFavorites = [...favorites, { id, name, price, imageUrl }];
    }

    Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 7 });
    setIsFavorite(!isFavorite);
  };

  return (
    <IconButton onClick={toggleFavorite}>
      {isFavorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
