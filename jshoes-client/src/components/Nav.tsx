import React, { useEffect, useState } from "react";
import { useMediaQuery, Badge } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  NavContainer,
  NavSpace,
  NavText,
} from "./CustomComponents/NavComponents";
import { ContentWidth, FlexColumn } from "./CustomComponents/BasicComponents";
import Logo from "./Logo";
import SearchShoes from "./SearchShoes";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

interface NavProps {
  onToggleTheme: () => void;
  mode: "light" | "dark";
}

const Nav: React.FC<NavProps> = ({ onToggleTheme, mode }) => {
  const bigScreenSize = useMediaQuery("(min-width:600px)");

  const [favCount, setFavCount] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    // Function to load favorites and cart counts from cookies
    const loadCounts = () => {
      const favorites = JSON.parse(Cookies.get("favorites") || "[]");
      const cart = JSON.parse(Cookies.get("cart") || "[]");

      setFavCount(favorites.length);
      setCartCount(cart.length);
    };

    // Load counts initially
    loadCounts();

    // Set up event listeners for custom events
    const handleFavoritesUpdate = () => loadCounts();
    const handleCartUpdate = () => loadCounts();

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <FlexColumn>
      <NavContainer>
        <ContentWidth
          sx={{
            justifyContent: "space-between",
            padding: "0",
            alignItems: "center",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <NavText>
              <Logo />
              {bigScreenSize && "Jason Scott Shoes"}
            </NavText>
          </Link>
          <NavText sx={{ alignSelf: "center" }}>
            <div>
              <SearchShoes />
            </div>
            <div onClick={onToggleTheme}>
              {mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </div>
            <Link
              to="/favorite"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Badge
                badgeContent={favCount}
                overlap="circular"
                color="error"
                style={{ transform: "translateY(-10px)" }}
              >
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </Link>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Badge
                badgeContent={cartCount}
                overlap="circular"
                color="error"
                style={{ transform: "translateY(-10px)" }}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Link>
            <div>
              <PersonOutlineOutlinedIcon />
            </div>
          </NavText>
        </ContentWidth>
      </NavContainer>
      <NavSpace />
    </FlexColumn>
  );
};
export default Nav;
