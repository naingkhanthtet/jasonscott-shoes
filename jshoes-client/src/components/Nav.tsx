import React from "react";
import { useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { NavContainer, NavText } from "./CustomComponents/NavComponents";
import { ContentWidth } from "./CustomComponents/BasicComponents";
import Logo from "./Logo";

const Nav: React.FC = () => {
  const bigScreenSize = useMediaQuery("(min-width:600px)");

  return (
    <NavContainer>
      <ContentWidth
        sx={{
          justifyContent: "space-between",
        }}
      >
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
      </ContentWidth>
    </NavContainer>
  );
};
export default Nav;
