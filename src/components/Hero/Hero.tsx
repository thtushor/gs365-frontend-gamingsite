import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  // Autoplay
} from "swiper/modules";
import { motion } from "framer-motion";

// import "swiper/css";
// import "swiper/css/pagination";

import "./Hero.scss";
import banner1 from "../../assets/Banner/b-1.png";
import banner2 from "../../assets/Banner/b-2.png";
import banner3 from "../../assets/Banner/b-3.png";
import banner4 from "../../assets/Banner/b-4.png";

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

export const Hero: React.FC = () => {
  return (
    <div className="hero-section !mt-[70px] lg:!mt-[100px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        breakpoints={{
          0: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 8,
          },
          769: {
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 0,
          },
        }}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <motion.div
                className="image-wrapper"
                initial={{ opacity: 0, scale: 1 }}
                animate={
                  isActive
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0.7, scale: 1 }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img src={slide.imageUrl} alt="banner" />
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
