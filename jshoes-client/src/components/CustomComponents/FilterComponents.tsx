import { Button, styled } from "@mui/material";

export const SelectedFilterBox = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.text.primary}`,
  padding: "2px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  maxWidth: "100%",
  minWidth: "fit-content",
  overflow: "hidden",
}));
