import React, { useEffect, useState } from "react";
import BackHome from "./BackHome";
import { Typography } from "@mui/material";
import { ContentWidth } from "./CustomComponents/BasicComponents";
import { WrapContainer } from "./CustomComponents/BasicComponents";
import ShoeCard from "./ShoeCard";
import Cookies from "js-cookie";
import Shoe from "./Shoe";

const FavoritePage: React.FC = () => {
  const [favoriteShoes, setFavoriteShoes] = useState<Shoe[]>([]);
  useEffect(() => {
    const favorites = JSON.parse(Cookies.get("favorites") || "[]");
    setFavoriteShoes(favorites);
  }, []);

  return (
    <>
      <BackHome />
      <ContentWidth>
        <Typography variant="h4">Your favorite shoes</Typography>
      </ContentWidth>
      <ContentWidth>
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
                image={shoe.image}
              />
            ))
          ) : (
            <Typography variant="h5">No favorites yet.</Typography>
          )}
        </WrapContainer>
      </ContentWidth>
    </>
  );
};

export default FavoritePage;
