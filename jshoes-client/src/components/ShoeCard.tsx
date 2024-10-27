import React from "react";
import { Typography, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ShoeCardBox } from "./CustomComponents/ShoeComponents";
import { FlexColumn, FlexRow, Image } from "./CustomComponents/BasicComponents";

interface ShoeCardProps {
  name: string;
  type: string;
  price: number;
  imageUrl: string;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ name, type, price, imageUrl }) => {
  return (
    <ShoeCardBox>
      <Image src={imageUrl} alt={name} />

      <FlexRow>
        <FlexColumn>
          <Typography>{name}</Typography>
          <Typography>{type}</Typography>
          <Typography>${price}</Typography>
        </FlexColumn>
        <FlexColumn>
          <IconButton>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </FlexColumn>
      </FlexRow>
    </ShoeCardBox>
  );
};

export default ShoeCard;
