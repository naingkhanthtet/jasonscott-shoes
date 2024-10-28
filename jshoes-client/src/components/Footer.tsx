import React from "react";
import { Typography, useMediaQuery, Theme } from "@mui/material";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import {
  FooterComponent,
  FooterContents,
  FooterReference,
  FooterTitle,
  FooterLinkIcons,
} from "./CustomComponents/FooterComponents";
import { FlexColumn, FlexRow } from "./CustomComponents/BasicComponents";
import brands from "../assets/brands";

const informations: string[] = ["Contact Me", "About Me", "Partnerships"];

const Footer: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <FooterComponent>
      <FooterContents>
        <FlexRow>
          {/* Brands Section */}
          <FlexColumn>
            <FooterTitle>Brands</FooterTitle>
            {brands.map((brand) => (
              <Typography key={brand}>{brand}</Typography>
            ))}
          </FlexColumn>

          {/* Information Section - Hidden on Mobile */}
          {!isMobile && (
            <FlexColumn>
              <FooterTitle>Information</FooterTitle>
              {informations.map((info) => (
                <Typography key={info}>{info}</Typography>
              ))}
            </FlexColumn>
          )}

          {/* Follow Me Section */}
          <FlexColumn>
            <FooterTitle>Follow Me</FooterTitle>
            {["LinkedIn", "GitHub", "YouTube"].map((platform) => (
              <Typography key={platform}>{platform}</Typography>
            ))}
          </FlexColumn>
        </FlexRow>

        {/* Footer Bottom Text */}
        <FooterReference>
          built by naingkhanthtet
          <FooterLinkIcons href="https://www.linkedin.com">
            <FaGithub />
          </FooterLinkIcons>
          <FooterLinkIcons href="https://www.linkedin.com">
            <FaLinkedin />
          </FooterLinkIcons>
        </FooterReference>
      </FooterContents>
    </FooterComponent>
  );
};

export default Footer;
