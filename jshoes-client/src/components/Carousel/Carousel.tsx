import React, { useState } from "react";
import {
  CarouselContainer,
  CarouselRightNavigator,
} from "../CustomComponents/CarouselComponents";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { CarouselLeftNavigator } from "../CustomComponents/CarouselComponents";
import { Image } from "../CustomComponents/BasicComponents";

// Sample images for carousel
const images: string[] = [
  "/images/Gazalle.jpg",
  "/images/Samba.jpg",
  "/images/Ultraboost.jpg",
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
      <Image src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />

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
