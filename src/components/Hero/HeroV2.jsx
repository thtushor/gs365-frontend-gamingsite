import React from "react";
import Slider from "react-slick";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroV2.scss";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  focusOnSelect: false,
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

export const HeroV2 = () => {
  const getRequest = useGetRequest();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["banners"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_HERO_BANNERS,
        errorMessage: "Failed to fetch banners list",
        isPublic: true,
      }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="hero-section !h-[120px] md:!h-[400px]">
        <div className="game-grid-container loading !p-0 !min-h-[120px] md:!min-h-[300px]">
          <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return;
  }

  const banners = data?.data || [];

  if (banners?.length <= 1) {
    return (
      <div
        className="slide-item !h-[120px] md:!h-[400px]"
        style={{ width: "100%", height: "400px", overflow: "hidden" }}
      >
        <img
          src={banners?.[0]?.original || "/src/assets/banner-placeholder.png"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  return (
    <div className="hero-section">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div
            key={index}
            className="slide-item !h-[120px] md:!h-[400px]"
            style={{ width: "100%", height: "400px", overflow: "hidden" }}
          >
            <img
              src={banner.original}
              alt={`banner-${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
