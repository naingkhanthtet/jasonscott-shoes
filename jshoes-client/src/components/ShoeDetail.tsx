import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../interceptors/axiosInstance";
import { Typography, Box } from "@mui/material";
import {
  ContentWidth,
  FlexRow,
  FlexColumn,
  Image,
  StyledButton,
} from "./CustomComponents/BasicComponents";
import { ShoeDetailContainer } from "./CustomComponents/ShoeComponents";
import BackHome from "./BackHome";
import FavoriteButton from "./FavoriteButton";

interface Shoe {
  id: number;
  name: string;
  brand: string;
  color: string;
  type: string;
  price: number;
  image: string;
  gender: string;
  stock: number;
}

const ShoeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shoe, setShoe] = useState<Shoe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/shop/shoes/${id}`)
      .then((response) => {
        setShoe(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching shoe details", err);
        setError("Error fetching shoe details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <BackHome />
      <ContentWidth sx={{ padding: "20px" }}>
        {shoe && (
          <ShoeDetailContainer>
            <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={shoe.image}
                alt={shoe.name}
                sx={{ maxWidth: "600px" }}
              />
            </Box>
            <FlexColumn
              sx={{
                width: { xs: "100%", sm: "50%" },
                alignItems: { sm: "center" },
                justifyContent: "center",
              }}
            >
              <div>
                <Typography variant="h4">{shoe.name}</Typography>
                <Typography variant="h5">${shoe.price}</Typography>
                <Typography>
                  {shoe.brand}, {shoe.type}, {shoe.color}, {shoe.gender}
                </Typography>
                <Typography>{shoe.stock} stocks left</Typography>
                <FlexRow>
                  <StyledButton>Add to Cart</StyledButton>
                  <FavoriteButton
                    id={shoe.id}
                    name={shoe.name}
                    price={shoe.price}
                    imageUrl={shoe.image}
                  />
                </FlexRow>
              </div>
            </FlexColumn>
          </ShoeDetailContainer>
        )}
      </ContentWidth>
    </>
  );
};

export default ShoeDetail;
