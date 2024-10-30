import React, { useEffect, useState } from "react";
import BackHome from "./BackHome";
import { Typography } from "@mui/material";
import { ContentWidth } from "./CustomComponents/BasicComponents";
import { WrapContainer } from "./CustomComponents/BasicComponents";
import ShoeCard from "./ShoeCard";
import Cookies from "js-cookie";

interface Shoe {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const FavoritePage: React.FC = () => {
  const [favoriteShoes, setFavoriteShoes] = useState<Shoe[]>([]);
  useEffect(() => {
    const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    setFavoriteShoes(favorites);
  }, []);

  return (
    <>
      <BackHome />
      <ContentWidth
        sx={{
          padding: "20px",
        }}
      >
        <Typography variant="h4">Your favorite shoes</Typography>
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
        {favoriteShoes.length > 0 ? (
          favoriteShoes.map((shoe) => (
            <ShoeCard
              key={shoe.id}
              id={shoe.id}
              name={shoe.name}
              price={shoe.price}
              imageUrl={shoe.imageUrl}
            />
          ))
        ) : (
          <Typography variant="h5">No favorites yet.</Typography>
        )}
      </WrapContainer>
    </>
  );
};

export default FavoritePage;
