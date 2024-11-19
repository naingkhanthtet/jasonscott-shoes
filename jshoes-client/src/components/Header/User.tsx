import React, { useState, useEffect } from "react";
import axiosInstance from "../../interceptors/axiosInstance";
import { Drawer, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";
import { StyledButton } from "../CustomComponents/BasicComponents";

const User: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status from backend
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get(
          "/auth/check-authentication/",
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(response.data.isAuthenticated);
      } catch {
        // console.error("Authentication check failed:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleIconClick = () => setOpenDrawer(true);
  const handleCloseClick = () => setOpenDrawer(false);
  const toggleUserSwitch = () => setIsRegistering(!isRegistering);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout/", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setOpenDrawer(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    setOpenDrawer(false);
  };

  return (
    <>
      <PersonOutlineOutlinedIcon
        onClick={handleIconClick}
        sx={{ cursor: "pointer" }}
      />

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseClick}
        PaperProps={{
          style: {
            width: "500px",
            padding: "20px",
          },
        }}
      >
        <IconButton
          onClick={handleCloseClick}
          style={{
            alignSelf: "flex-end",
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>

        {isLoggedIn ? (
          <StyledButton onClick={handleLogout} fullWidth>
            Logout
          </StyledButton>
        ) : isRegistering ? (
          <RegisterForm onToggleUser={toggleUserSwitch} />
        ) : (
          <LoginForm
            onToggleUser={toggleUserSwitch}
            onLoginSuccess={handleSuccessfulLogin}
          />
        )}
      </Drawer>
    </>
  );
};

export default User;
