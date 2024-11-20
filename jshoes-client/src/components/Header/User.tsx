import React, { useState, useEffect } from "react";
import axiosInstance from "../../interceptors/axiosInstance";
import { Drawer, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";
import { StyledButton } from "../CustomComponents/BasicComponents";

const User: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get("/auth/user/");
        setIsLoggedIn(true);
        setUsername(response.data.username);
      } catch {
        setIsLoggedIn(false);
        setUsername("");
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout/");

      if (response.status === 200) {
        // Clear the csrf value
        const csrfElement = document.getElementById(
          "csrf-token"
        ) as HTMLInputElement;
        if (csrfElement) {
          csrfElement.value = "";
        }

        setIsLoggedIn(false);
        setOpenDrawer(false);
        setUsername("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleIconClick = () => setOpenDrawer(true);
  const handleCloseClick = () => setOpenDrawer(false);
  const toggleUserSwitch = () => setIsRegistering(!isRegistering);

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
          <>
            <Typography variant="h5" sx={{ marginBottom: 5 }}>
              Welcome {username}
            </Typography>
            <StyledButton onClick={handleLogout} fullWidth>
              Logout
            </StyledButton>
          </>
        ) : isRegistering ? (
          <RegisterForm onToggleUser={toggleUserSwitch} />
        ) : (
          <LoginForm onToggleUser={toggleUserSwitch} />
        )}
      </Drawer>
    </>
  );
};

export default User;
