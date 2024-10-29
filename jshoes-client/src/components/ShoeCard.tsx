import React from "react";
import { Typography, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  ShoeCardBox,
  ShoeCardImageBox,
} from "./CustomComponents/ShoeComponents";
import { FlexColumn, FlexRow, Image } from "./CustomComponents/BasicComponents";

interface ShoeCardProps {
  name: string;
  price: number;
  imageUrl: string;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ name, price, imageUrl }) => {
  return (
    <ShoeCardBox>
      <ShoeCardImageBox>
        <Image src={imageUrl} alt={name} />
      </ShoeCardImageBox>

      <FlexRow>
        <FlexColumn>
          <Typography variant="h6">{name}</Typography>
          {/* <Typography>{type}</Typography> */}
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
