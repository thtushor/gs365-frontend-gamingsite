import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GameSlider/GameSlider.scss";
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

const eventList = [
  {
    id: 1,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247691.jpg",
  },
  {
    id: 2,
    name: "https://img.b112j.com/upload/announcement/image_247687.jpg",
    img: "https://img.b112j.com/upload/announcement/image_247691.jpg",
  },
  {
    id: 3,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247691.jpg",
  },
  {
    id: 4,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247687.jpg",
  },
  {
    id: 5,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247691.jpg",
  },
  {
    id: 6,
    name: "something",
    img: "https://img.b112j.com/upload/announcement/image_247687.jpg",
  },
];
export const Event = () => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
  if (eventList.length === 1) {
    const event = eventList[0];
    return (
      <div className="game-slider-container !p-0 !py-3 !pb-5">
        <div
          onClick={() =>
            navigate(
              `/event/${event?.id}?type=${type}&eventName=${event?.name}`
            )
          }
          className=""
        >
          <img loading="lazy" src={event?.img} className="w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] px-[15px] mx-auto text-left pt-5">
      <h1 className="text-[18px] capitalize md:text-[22px] font-semibold border-l-[4px] pl-1 border-yellow-300">
        Events
      </h1>
      <div className="game-slider-container  !p-0 !py-3 !pb-5 relative justify-start">
        <Slider {...settings}>
          {eventList.map((event) => (
            <div key={event.id} className="pr-2 md:pr-3">
              <img
                loading="lazy"
                src={event?.img}
                className="w-full rounded-md h-[90px] md:h-auto object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
