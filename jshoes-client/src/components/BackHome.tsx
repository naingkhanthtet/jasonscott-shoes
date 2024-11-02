import React from "react";
import { ContentWidth } from "./CustomComponents/BasicComponents";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BackHome: React.FC = () => {
  return (
    <ContentWidth>
      <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h5">&lt;-Back</Typography>
      </Link>
    </ContentWidth>
  );
};

export default BackHome;
