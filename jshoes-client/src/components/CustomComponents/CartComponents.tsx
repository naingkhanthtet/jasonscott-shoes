import { Box, styled } from "@mui/material";

export const CartShoeBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  display: "flex",
  alignItems: "center",
  padding: "10px",
}));
