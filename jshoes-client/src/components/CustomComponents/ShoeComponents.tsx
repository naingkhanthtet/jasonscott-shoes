import { styled, Box, Select } from "@mui/material";

export const ShoeCardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.text.primary}`,
  padding: "5px",
  boxShadow: `1px 1px 0px 0px ${theme.palette.text.primary}`,
  cursor: "pointer",
  transition: "box-shadow 0.2s ease",
  "&:hover": {
    boxShadow: `3px 3px 0px 0px ${theme.palette.text.primary}`,
  },
}));

export const ShoeCardImageBox = styled(Box)({
  width: "100%",
  height: "70%",
});

export const PaginationDropdown = styled(Select)(({ theme }) => ({
  padding: "5px",
  marginLeft: "10px",
  marginRight: "10px",
  maxWidth: "70px",
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: "0px",
  maxHeight: "40px",
  outline: "none",
}));

export const ShoeDetailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  border: `1px solid ${theme.palette.text.primary}`,
  padding: "50px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
  },
}));
