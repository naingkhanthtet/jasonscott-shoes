import React from "react";
import { ContentWidth, StyledLink } from "../CustomComponents/BasicComponents";
import { Typography } from "@mui/material";

const BackHome: React.FC = () => {
  return (
    <ContentWidth>
      <StyledLink to={"/"}>
        <Typography variant="h5">&lt;-Back</Typography>
      </StyledLink>
    </ContentWidth>
  );
};

export default BackHome;
