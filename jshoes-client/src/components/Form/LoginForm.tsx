import React, { useState } from "react";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { StyledTextarea } from "../CustomComponents/FormComponents";
import { Box, Typography, IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const LoginForm: React.FC<{ onToggleUser: () => void }> = ({
  onToggleUser,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordView = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Login</Typography>

          {/* Username */}
          <StyledTextarea
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />

          {/* Password */}
          <StyledTextarea
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handlePasswordView} edge="end">
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              ),
            }}
            fullWidth
          />

          <StyledButton type="submit" sx={{ marginTop: 3 }} fullWidth>
            Login
          </StyledButton>
        </Box>
      </form>
      <Typography
        sx={{
          padding: 2,
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={onToggleUser}
      >
        New to Jason Scott shoes?
      </Typography>
    </>
  );
};

export default LoginForm;
