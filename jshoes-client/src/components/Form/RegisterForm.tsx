import React, { useState } from "react";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { StyledTextarea } from "../CustomComponents/FormComponents";
import { Box, Typography, IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import registerValidationSchema from "./registerValidationSchema";
import { useFormik } from "formik";
import axiosInstance from "../../interceptors/axiosInstance";

const RegisterForm: React.FC<{ onToggleUser: () => void }> = ({
  onToggleUser,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      re_password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(`/auth/register/`, values);
        if (response.status >= 200 && response.status <= 300) {
          window.location.reload();
          alert(response.data.message);
        }
      } catch (err) {
        console.error("Registeration error: ", err);
        alert("Something went wrong.");
      }
    },
  });

  const handlePasswordView = () => setShowPassword(!showPassword);
  const handleRePasswordView = () => setShowRePassword(!showRePassword);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Register</Typography>

          {/* Email */}
          <StyledTextarea
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email &&
              formik.dirty &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email && formik.dirty && formik.errors.email
            }
            fullWidth
          />

          {/* Username */}
          <StyledTextarea
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.username &&
              formik.dirty &&
              Boolean(formik.errors.username)
            }
            helperText={
              formik.touched.username && formik.dirty && formik.errors.username
            }
            fullWidth
          />

          {/* Password */}
          <StyledTextarea
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password &&
              formik.dirty &&
              Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password && formik.dirty && formik.errors.password
            }
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

          {/* Retype Password */}
          <StyledTextarea
            label="Retype Password"
            type={showRePassword ? "text" : "password"}
            name="re_password"
            value={formik.values.re_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.re_password &&
              formik.dirty &&
              Boolean(formik.errors.re_password)
            }
            helperText={
              formik.touched.re_password &&
              formik.dirty &&
              formik.errors.re_password
            }
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleRePasswordView} edge="end">
                  {showRePassword ? (
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
            Register
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
        Already registered user?
      </Typography>
    </>
  );
};

export default RegisterForm;
