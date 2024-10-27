import { styled, Box } from "@mui/material";

export const ShoeCardBox = styled(Box)(({ theme }) => ({
  "@media (max-width: 600px)": {
    width: "150px",
    height: "300px",
  },
  "@media (min-width: 768px)": {
    width: "200px",
    height: "300px",
  },
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.text.primary}`,
  padding: "10px",
  boxShadow: `1px 1px 0px 0px ${theme.palette.text.primary}`,
  transition: "box-shadow 0.2s ease",
  "&:hover": {
    boxShadow: `3px 3px 0px 0px ${theme.palette.text.primary}`,
  },
}));
