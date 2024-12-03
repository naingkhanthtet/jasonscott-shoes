import React, { useState } from "react";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { StyledTextarea } from "../CustomComponents/FormComponents";
import { Box, Typography, IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import pwChangeValidationSchema from "./pwChangeValidationSchema";
import { useFormik } from "formik";
import axiosInstance from "../../interceptors/axiosInstance";

const PasswordChangeForm: React.FC<{ onToggle: () => void }> = ({
  onToggle,
}) => {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      re_password: "",
    },
    validationSchema: pwChangeValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(`/auth/change-pw/`, values);
        if (response.status >= 200 && response.status <= 300) {
          window.location.reload();
          alert(response.data.message);
        }
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          formik.setErrors({ old_password: err.response.data.error });
        } else if (err.response && err.response.status === 405) {
          formik.setErrors({ new_password: err.response.data.error });
        } else {
          console.error("Password change error: ", err);
          alert("Something went wrong.");
        }
      }
    },
  });

  const handleOldPasswordView = () => setShowOldPassword(!showOldPassword);
  const handleNewPasswordView = () => setShowNewPassword(!showNewPassword);
  const handleRePasswordView = () => setShowRePassword(!showRePassword);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">Change Password</Typography>

        {/* Old Password */}
        <StyledTextarea
          label="Old Password"
          name="old_password"
          type={showOldPassword ? "text" : "password"}
          value={formik.values.old_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.old_password &&
            formik.dirty &&
            Boolean(formik.errors.old_password)
          }
          helperText={
            formik.touched.old_password &&
            formik.dirty &&
            formik.errors.old_password
          }
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleOldPasswordView} edge="end">
                {showOldPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </IconButton>
            ),
          }}
          fullWidth
        />

        {/* New Password */}
        <StyledTextarea
          label="New Password"
          name="new_password"
          type={showNewPassword ? "text" : "password"}
          value={formik.values.new_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.new_password &&
            formik.dirty &&
            Boolean(formik.errors.new_password)
          }
          helperText={
            formik.touched.new_password &&
            formik.dirty &&
            formik.errors.new_password
          }
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleNewPasswordView} edge="end">
                {showNewPassword ? (
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

        <StyledButton
          type="submit"
          sx={{ bgcolor: "tomato", color: "white" }}
          fullWidth
        >
          Change
        </StyledButton>
        <StyledButton onClick={onToggle} fullWidth>
          Cancel
        </StyledButton>
      </Box>
    </form>
  );
};

export default PasswordChangeForm;
