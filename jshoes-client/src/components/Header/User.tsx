import React, { useState } from "react";
import { Drawer, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { useUser } from "../../utils/UserContext";

const User: React.FC = () => {
  const { user, handleLogout } = useUser();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

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
              Welcome {user.username} ({user.userid})
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
