import React from "react";
import {
  Box,
  Typography,
  Link,
  Grid,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { FooterComponent } from "./CustomComponents/FooterComponents";

const Footer: React.FC = () => {
  // Use media query to detect small screens (mobile devices)
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <FooterComponent>
      <Grid container spacing={4} justifyContent="center">
        {/* Brands Section */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ textAlign: isMobile ? "left" : "center" }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontFamily: "cursive" }}>
            Brands
          </Typography>
          {[
            "Adidas",
            "Nike",
            "Puma",
            "Crocs",
            "Sin Pauk",
            "Skechers",
            "Timberland",
          ].map((brand) => (
            <Typography key={brand} sx={{ fontFamily: "cursive" }}>
              {brand}
            </Typography>
          ))}
        </Grid>

        {/* Information Section - Hidden on Mobile */}
        {!isMobile && (
          <Grid item xs={12} sm={4}>
            Information
            {["Contact Me", "About Me", "Partnerships"].map((info) => (
              <Typography
                key={info}
                sx={{ fontFamily: "cursive", textAlign: "center" }}
              >
                {info}
              </Typography>
            ))}
          </Grid>
        )}

        {/* Follow Me Section */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ textAlign: isMobile ? "right" : "center" }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontFamily: "cursive" }}>
            Follow Me
          </Typography>
          {["LinkedIn", "GitHub", "YouTube"].map((platform) => (
            <Typography key={platform} sx={{ fontFamily: "cursive" }}>
              {platform}
            </Typography>
          ))}
        </Grid>
      </Grid>

      {/* Footer Bottom Text */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography sx={{ fontFamily: "cursive" }}>
          built by{" "}
          <Link href="https://github.com/naingkhanthtet" color="inherit">
            naingkhanthtet
          </Link>{" "}
          (
          <Link href="https://www.linkedin.com" color="inherit">
            GitHub
          </Link>
          ) (
          <Link href="https://www.linkedin.com" color="inherit">
            LinkedIn
          </Link>
          )
        </Typography>
      </Box>
    </FooterComponent>
  );
};

export default Footer;
