import { styled, TextField, Select } from "@mui/material";

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
    borderRadius: 0,
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Remove the default border around the component
  },
  "&.MuiOutlinedInput-root": {
    borderBottom: `1px solid ${theme.palette.text.primary}`, // Add only the bottom border
    borderRadius: 0, // Remove all border radius
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none", // Ensure no border on hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none", // Ensure no border on focus
  },
}));
