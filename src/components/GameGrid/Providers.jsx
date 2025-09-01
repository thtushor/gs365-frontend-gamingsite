import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../GameSlider/GameSlider.scss";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // optional: using react-icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

  // If only one provider, render it normally
  if (providerList.length === 1) {
    const provider = providerList[0];
    return (
      <div className="game-slider-container !p-0 !py-3 !pb-5">
        <div
          onClick={() =>
            navigate(
              `/provider/${provider?.id}?type=${type}&providerName=${provider?.name}`
            )
          }
          className="flex items-center justify-center w-fit cursor-pointer hover:bg-gray-700 bg-gray-800 gap-3 px-3 md:px-[15px] py-[6px] md:py-3 rounded-md"
        >
          <img
            loading="lazy"
            src={provider?.logo}
            className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] object-cover rounded-full"
          />
          <p className="md:!leading-3 text-[14px] md:!text-[16px]">
            {provider?.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-slider-container !p-0 !py-3 !pb-5 relative justify-start">
      <Slider {...settings}>
        {providerList.map((provider) => (
          <div key={provider.id} className="pr-2 md:pr-3">
            <div
              onClick={() =>
                navigate(
                  `/provider/${provider?.id}?type=${type}&providerName=${provider?.name}`
                )
              }
              className="flex items-center justify-center cursor-pointer hover:bg-gray-700 bg-gray-800 gap-3 px-1 md:px-[15px] py-[6px] md:py-3 rounded-md"
            >
              <img
                loading="lazy"
                src={provider?.logo}
                className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] object-cover rounded-full"
              />
              <p className="md:!leading-3 text-[14px] md:!text-[16px]">
                {provider?.name}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
