import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { Box } from "@mui/material";

export const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(1, 4),
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export const NavContainer = styled(Box)(({ theme }) => ({
  padding: "20px",
  borderBottom: `1px solid ${theme.palette.text.primary}`,
  position: "fixed",
  top: "0",
  zIndex: "1000",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export const NavContentBox = styled(Box)({
  margin: "auto",
  display: "flex",
  maxWidth: "1920px",
  alignItems: "center",
  justifyContent: "space-between",
});

export const NavText = styled(Box)({
  cursor: "pointer",
  fontSize: "2rem",
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
});

export const NavIcons = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const NavSpace = styled(Box)({
  height: "90px",
});
