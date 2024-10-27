import { Box, Button, styled } from "@mui/material";

export const FilterContainer = styled(Box)({
  margin: "auto",
  display: "flex",
  maxWidth: "1920px",
  padding: "20px",
});

export const SelectedFilterBox = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.text.primary}`,
  padding: "2px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  maxWidth: "100%",
  minWidth: "fit-content",
  overflow: "hidden",
}));
