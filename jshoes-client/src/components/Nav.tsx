import React from "react";
import { useMediaQuery, IconButton } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { NavContainer, NavText } from "./CustomComponents/NavComponents";
import { ContentWidth } from "./CustomComponents/BasicComponents";
import Logo from "./Logo";
import SearchShoes from "./SearchShoes";
import { Link } from "react-router-dom";

interface NavProps {
  onToggleTheme: () => void;
  mode: "light" | "dark";
}

const Nav: React.FC<NavProps> = ({ onToggleTheme, mode }) => {
  const bigScreenSize = useMediaQuery("(min-width:600px)");

  return (
    <NavContainer>
      <ContentWidth
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <NavText>
            <Logo />
            {bigScreenSize && "Jason Scott Shoes"}
          </NavText>
        </Link>
        <NavText>
          <SearchShoes />
          <IconButton onClick={onToggleTheme} color="inherit" disableRipple>
            {mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
          <FavoriteBorderOutlinedIcon />
          <ShoppingCartOutlinedIcon />
          <PersonOutlineOutlinedIcon />
        </NavText>
      </ContentWidth>
    </NavContainer>
  );
};
export default Nav;
