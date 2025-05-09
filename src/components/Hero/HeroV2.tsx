import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

// import {
//   Autoplay,
//   Navigation,
//   Pagination,
//   // Autoplay
// } from "swiper/modules";
// import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./HeroV2.scss";

// import "swiper/css";
// import "swiper/css/pagination";

import "./Hero.scss";
import banner1 from "../../assets/Banner/b-1.png";
import banner2 from "../../assets/Banner/b-2.png";
import banner3 from "../../assets/Banner/b-3.png";
import banner4 from "../../assets/Banner/b-5.png";

const heroSlides = [
  {
    id: 1,
    imageUrl: banner1,
  },
  {
    id: 2,
    imageUrl: banner2,
  },
  {
    id: 3,
    imageUrl: banner3,
  },
  {
    id: 4,
    imageUrl: banner4,
  },
];

export const HeroV2: React.FC = () => {
  return (
    <div className="hero-section">
      <Slider {...settings}>
        {heroSlides.map((slide) => (
          <div key={slide.id} className="slide-item">
            <img src={slide.imageUrl} alt={`banner-${slide.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
