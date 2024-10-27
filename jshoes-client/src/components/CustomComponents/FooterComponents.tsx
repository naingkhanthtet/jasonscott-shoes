import { Box, Link, styled, Typography } from "@mui/material";

export const FooterComponent = styled(Box)({
  backgroundColor: "black",
  color: "white",
  padding: "20px",
  marginTop: "100px",
});

export const FooterContents = styled(Box)({
  maxWidth: "1920px",
  margin: "auto",
});

export const FooterTitle = styled(Typography)({
  fontSize: "2rem",
});

export const FooterReference = styled(Box)({
  padding: "20px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
});

export const FooterLinkIcons = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "white",
});
