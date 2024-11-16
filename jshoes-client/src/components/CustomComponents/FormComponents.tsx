import { styled, TextField } from "@mui/material";

export const StyledTextarea = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    borderBottom: `1px solid ${theme.palette.text.primary}`,
  },
}));
