import { styled } from "@mui/material";
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
