import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";
import { useUser } from "../../utils/useUser";
import MemberMenu from "../pages/MemberMenu";

const User: React.FC = () => {
  const { user } = useUser();
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
            width: "350px",
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
          <MemberMenu />
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
