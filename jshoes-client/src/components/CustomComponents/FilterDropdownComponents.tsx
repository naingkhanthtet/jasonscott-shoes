import { Button, styled } from "@mui/material";
import {
  Box,
  // Button,
  // Checkbox,
  // Collapse,
  // FormControlLabel,
  // IconButton,
  // List,
  // ListItem,
  // ListItemText,
  // Menu,
  // MenuItem,
} from "@mui/material";

export const FilterContainer = styled(Box)({
  margin: "auto",
  display: "flex",
  maxWidth: "1728px",
  padding: "20px",
});

export const SelectedContainer = styled(Box)({
  padding: "10px",
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
  width: "100%",
  maxWidth: "100%",
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
