import React from "react";
import { Typography } from "@mui/material";
import {
  ShoeCardBox,
  ShoeCardImageBox,
} from "./CustomComponents/ShoeComponents";
import { FlexColumn, FlexRow, Image } from "./CustomComponents/BasicComponents";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

interface ShoeCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ id, name, price, imageUrl }) => {
  return (
    <ShoeCardBox key={id}>
      <Link
        to={`/shoes/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
        key={id}
      >
        <ShoeCardImageBox>
          <Image src={imageUrl} alt={name} />
        </ShoeCardImageBox>
      </Link>

      <FlexRow>
        <Link
          to={`/shoes/${id}`}
          style={{ textDecoration: "none", color: "inherit", width: "80%" }}
          key={id}
        >
          <FlexColumn>
            <Typography variant="h6">{name}</Typography>
            <Typography>${price}</Typography>
          </FlexColumn>
        </Link>
        <FlexColumn>
          <FavoriteButton
            id={id}
            name={name}
            price={price}
            imageUrl={imageUrl}
          />
        </FlexColumn>
      </FlexRow>
    </ShoeCardBox>
  );
};

export default ShoeCard;
