import { Box, IconButton } from "@mui/material";
import styled from "@emotion/styled";

export const CarouselContainer = styled(Box)({
  position: "relative",
  width: "100%",
  maxWidth: "1920px",
  height: "400px",
  overflow: "hidden",
  margin: "auto",
});

const CarouselNavigator = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  color: "black",
  backgroundColor: "white",
  border: "1px solid black",
  boxShadow: "1px 1px 0px 0px black",
  transition: "box-shadow 0.2s ease",
  ":hover": {
    color: "black",
    backgroundColor: "white",
    boxShadow: "3px 3px 0px 0px black",
  },
});

export const CarouselLeftNavigator = styled(CarouselNavigator)({
  left: "10px",
});

export const CarouselRightNavigator = styled(CarouselNavigator)({
  right: "10px",
});
