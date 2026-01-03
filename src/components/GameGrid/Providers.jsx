import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../GameSlider/GameSlider.scss";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // optional: using react-icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SmallProviderCard from "./SmallProviderCard";

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow right-7 md:right-8 bg-gray-800 w-[25px] h-[25px] flex items-center justify-center rounded-md"
      onClick={onClick}
      style={{
        position: "absolute",
        zIndex: 2,
        top: "-25px",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
    >
      <IoIosArrowBack size={20} color="white" />
    </div>
  );
};

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow right-0 md:right-0 bg-gray-800 w-[25px] h-[25px] flex items-center justify-center rounded-md"
      onClick={onClick}
      style={{
        position: "absolute",
        zIndex: 2,
        top: "-25px",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
    >
      <IoIosArrowForward size={20} color="white" />
    </div>
  );
};

export const Providers = ({ providerList = [], type = "games" }) => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // enable arrows
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if(providerList.length <1){
    return null;
  }

  // If only one provider, render it normally
  if (providerList.length !== 1) {
    const provider = providerList[0];
    return (
      <div className="game-slider-container !p-0 !pt-[6px] !pb-5 relative justify-start">
      <SmallProviderCard key={1} provider={provider} type={type} navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="game-slider-container !p-0 !pt-[6px] !pb-5 relative justify-start">
      <Slider {...settings}>
        {providerList.map((provider) => (
          <SmallProviderCard key={provider.id} provider={provider} type={type} navigate={navigate} />
        ))}
      </Slider>
    </div>
  );
};
