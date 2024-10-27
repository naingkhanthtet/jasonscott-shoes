import { Box, styled } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";

export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
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

export const FlexColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const FlexRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "auto",
  justifyContent: "space-between",
});

export const WrapContainer = styled(Box)({
  padding: "20px",
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
  width: "100%",
  maxWidth: "100%",
});

export const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
