import React, { useState } from "react";
import { Typography } from "@mui/material";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { useUser } from "../../utils/useUser";
import PasswordChangeForm from "../Form/PasswordChangeForm";
import DeleteAccountForm from "../Form/DeleteAccountForm";

const MemberMenu: React.FC = () => {
  const { user, handleLogout } = useUser();
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);

  const toggleChangePassword = () => setIsChangingPassword(!isChangingPassword);
  const toggleDeleteAccount = () => setIsDeletingAccount(!isDeletingAccount);

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 5 }}>
        Welcome {user.username}
      </Typography>
      {isChangingPassword ? (
        <PasswordChangeForm onToggle={toggleChangePassword} />
      ) : isDeletingAccount ? (
        <DeleteAccountForm onToggle={toggleDeleteAccount} />
      ) : (
        <>
          <StyledButton
            onClick={toggleChangePassword}
            sx={{ marginBottom: 3 }}
            fullWidth
          >
            Change Password
          </StyledButton>

          <StyledButton
            onClick={toggleDeleteAccount}
            sx={{ marginBottom: 3 }}
            fullWidth
          >
            Delete Account
          </StyledButton>

          <StyledButton
            onClick={handleLogout}
            sx={{ marginBottom: 3 }}
            fullWidth
          >
            Logout
          </StyledButton>
        </>
      )}
    </>
  );
};

export default MemberMenu;
