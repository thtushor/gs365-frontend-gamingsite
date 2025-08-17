import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import { GameCard } from "../GameCard/GameCard";
import { SliderHeader } from "./SliderHeader";
import "./GameSlider.scss";
import { GameCard } from "./GameCard";

interface GameSliderProps {
  title: string;
  games: Game[];
  showAll?: boolean;
}

interface Game {
  id: string;
  title: string;
  imageUrl: string;
  provider?: string;
  isLive?: boolean;
  badge?: string;
}

export const GameSlider: React.FC<GameSliderProps> = ({
  title,
  games,
  showAll = true,
}) => {
  return (
    <div className="game-slider-container">
      <SliderHeader title={title} showAll={showAll} />
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={6}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 2.5,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 5.5,
            spaceBetween: 16,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        className="game-slider"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <GameCard game={game} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
