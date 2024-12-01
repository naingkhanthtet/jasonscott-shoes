import React from "react";
import { useUser } from "../../utils/useUser";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { StyledTextarea } from "../CustomComponents/FormComponents";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
// import axiosInstance from "../../interceptors/axiosInstance";

const DeleteAccountForm: React.FC<{ onToggle: () => void }> = ({
  onToggle,
}) => {
  const { user, handleDeleteAccount } = useUser();
  const formik = useFormik({
    initialValues: {
      confirm_username: "",
    },
    validationSchema: Yup.object({
      confirm_username: Yup.string()
        .required("Username is required")
        .test(
          "match-username",
          "Username does not match",
          (value) => value === user.username
        ),
    }),
    onSubmit: () => {
      handleDeleteAccount();
    },
  });

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
        <Typography variant="h4">Delete account</Typography>

        <Typography>
          <strong>Warning: This action cannot be undone.</strong> Please, fill
          in your username <u>{user.username}</u> to delete account.
        </Typography>

        {/* Type username to delete */}
        <StyledTextarea
          label="Your username"
          type="text"
          name="confirm_username"
          value={formik.values.confirm_username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirm_username &&
            formik.dirty &&
            Boolean(formik.errors.confirm_username)
          }
          helperText={
            formik.touched.confirm_username &&
            formik.dirty &&
            formik.errors.confirm_username
          }
          fullWidth
        />

        <StyledButton
          type="submit"
          sx={{ bgcolor: "red", color: "white" }}
          fullWidth
        >
          Delete
        </StyledButton>
        <StyledButton onClick={onToggle} fullWidth>
          Discard
        </StyledButton>
      </Box>
    </form>
  );
};

export default DeleteAccountForm;
