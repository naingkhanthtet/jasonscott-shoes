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
}));

export const NavContentBox = styled(Box)({
  margin: "auto",
  display: "flex",
  maxWidth: "1920px",
  alignItems: "center",
  justifyContent: "space-between",
});

export const NavText = styled(Box)({
  fontSize: "2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});
