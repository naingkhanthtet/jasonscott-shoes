import React, { useState, useEffect } from "react";
import axiosInstance from "../../interceptors/axiosInstance";
import { Drawer, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { useUser } from "../../utils/UserContext";

const User: React.FC = () => {
  const { user, setUser, handleLogout, syncUserData } = useUser();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get("/auth/user/");
        setUser((prev) => ({
          ...prev,
          isLoggedIn: true,
          username: response.data.username,
        }));
      } catch {
        setUser((prev) => ({
          ...prev,
          isLoggedIn: false,
          username: "",
        }));
      }
    };

    checkAuthStatus();
  }, [setUser]);

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

        {user.isLoggedIn ? (
          <>
            <Typography variant="h5" sx={{ marginBottom: 5 }}>
              Welcome {user.username}
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
