import React, { useState } from "react";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { StyledTextarea } from "../CustomComponents/FormComponents";
import { Box, Typography, IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axiosInstance from "../../interceptors/axiosInstance";
import useCsrfToken from "../../utils/useCsrfToken";

interface LoginFormProps {
  onToggleUser: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleUser }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const csrfToken = useCsrfToken();

  const handlePasswordView = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/auth/login/",
        {
          username,
          password,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (response.status === 200) {
        alert("Login successful!");
        // Force reload the page to ensure clean state
        window.location.reload();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password.");
    }
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

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}

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
