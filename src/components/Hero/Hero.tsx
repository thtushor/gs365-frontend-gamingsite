import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "./Hero.scss";
import banner1 from "../../assets/Banner/b-1.png";
import banner2 from "../../assets/Banner/b-2.png";
import banner3 from "../../assets/Banner/b-3.png";
import banner4 from "../../assets/Banner/b-4.png";

const heroSlides = [
  {
    id: 1,
    title: "SPIN OF THRONES III",
    subtitle: "€250,000 + 60,555 FS",
    imageUrl: banner1,
  },
  {
    id: 2,
    title: "MEGA TOURNAMENT",
    subtitle: "Win up to €100,000 Daily",
    imageUrl: banner2,
  },
  {
    id: 3,
    title: "LIVE CASINO BONUS",
    subtitle: "200% Welcome Bonus",
    imageUrl: banner3,
  },
  {
    id: 4,
    title: "SLOTS PARADISE",
    subtitle: "1000+ Games Available",
    imageUrl: banner4,
  },
];

export const Hero: React.FC = () => {
  return (
    <div className="hero-section !mt-[70px] lg:!mt-[100px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        effect="fade"
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              <div className="image-wrapper">
                <img src={slide.imageUrl} alt={slide.title} />
                <div className="overlay" />
              </div>
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <button className="btn-play">PLAY NOW</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
