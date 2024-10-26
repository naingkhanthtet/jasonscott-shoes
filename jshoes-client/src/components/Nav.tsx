import React from "react";
import { useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { NavContainer } from "./CustomComponents/NavComponents";
import { NavContentBox } from "./CustomComponents/NavComponents";
import { NavText } from "./CustomComponents/NavComponents";
import Logo from "./Logo";

const Nav: React.FC = () => {
  const bigScreenSize = useMediaQuery("(min-width:600px)");

  return (
    <NavContainer>
      <NavContentBox>
        <NavText>
          <Logo />
          {bigScreenSize && "Jason Scott Shoes"}
        </NavText>
        <NavText>
          <SearchIcon />
          <DarkModeOutlinedIcon />
          <FavoriteBorderOutlinedIcon />
          <ShoppingCartOutlinedIcon />
          <PersonOutlineOutlinedIcon />
        </NavText>
      </NavContentBox>
    </NavContainer>
  );
};
export default Nav;
