import React, { useEffect, useState } from "react";
import axiosInstance from "../interceptors/axiosInstance";
import ShoeCard from "./ShoeCard";
import {
  ContentWidth,
  StyledButton,
  WrapContainer,
} from "./CustomComponents/BasicComponents";

interface Shoe {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
}

const Shoes: React.FC = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleShoe, setVisibleShoes] = useState<number>(5);

  useEffect(() => {
    axiosInstance
      .get("/shop/shoes/")
      .then((response) => {
        setShoes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching shoes", err);
        setError("Error fetching shoes");
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    setVisibleShoes((prev) => prev + 5);
  };

  const loadLess = () => {
    setVisibleShoes((prev) => prev - 5);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <ContentWidth>
        <WrapContainer
          sx={{
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {shoes.slice(0, visibleShoe).map((shoe) => (
            <ShoeCard
              key={shoe.id}
              name={shoe.name}
              type={shoe.type}
              price={shoe.price}
              imageUrl={shoe.image}
            />
          ))}
        </WrapContainer>
      </ContentWidth>
      <ContentWidth
        sx={{
          justifyContent: "center",
        }}
      >
        {visibleShoe < shoes.length ? (
          <StyledButton onClick={loadMore}>Load More</StyledButton>
        ) : (
          <StyledButton onClick={loadLess}>Load Less</StyledButton>
        )}
      </ContentWidth>
    </>
  );
};

export default Shoes;
