import React, { useState } from "react";
import {
  CarouselContainer,
  CarouselImage,
  CarouselRightNavigator,
} from "./CustomComponents/CarouselComponents";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { CarouselLeftNavigator } from "./CustomComponents/CarouselComponents";

// Sample images for carousel
const images: string[] = [
  "https://assets.adidas.com/videos/f220f9e2fa8043eea6880ef93d460236_d98c/IE8503_HM1.jpg",
  "https://assets.adidas.com/videos/15916575e46f466284535b45488d0b28_d98c/HQ4204_HM1.jpg",
  "https://assets.adidas.com/videos/9f7117a8670d4798ad3a058c076fc05d_d98c/IE4956_HM1.jpg",
  // "https://imgnike-a.akamaihd.net/1920x1920/02538551.jpg",
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <CarouselContainer>
      {/* Carousel images */}
      <CarouselImage
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />

      {/* Left Arrow */}
      <CarouselLeftNavigator onClick={handlePrev}>
        <KeyboardArrowLeftOutlinedIcon />
      </CarouselLeftNavigator>

      {/* Right Arrow */}
      <CarouselRightNavigator onClick={handleNext}>
        <KeyboardArrowRightOutlinedIcon />
      </CarouselRightNavigator>
    </CarouselContainer>
  );
};

export default Carousel;
