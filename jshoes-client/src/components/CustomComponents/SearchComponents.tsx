import { ListItem, styled } from "@mui/material";

export const SearchField = styled("input")(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: "none",
  padding: "10px",
  width: "100%",
  outline: "none",
  fontFamily: `${theme.typography.fontFamily}`,
  fontSize: `${theme.typography.fontSize}`,
}));

export const SearchResult = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    border: `1px solid ${theme.palette.text.primary}`,
  },
}));
