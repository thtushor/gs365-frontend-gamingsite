import React from "react";
import SeoSection from "../components/Layout/SeoSection";
import { seoContent, seoTitle, filterOptions } from "../lib/mock";

import VipFilterBar from "../components/UI/VipFilterBar";
import PromotionList from "../components/Promotion/PromotionList";
import { HeroV2 } from "../components/Hero/HeroV2";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import Sponsors from "../components/Sponsors";

const PromotionPage = () => {
  const getRequest = useGetRequest();

  const {
    data: promotionList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["promotions"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_PROMOTIONS,
        errorMessage: "Failed to fetch promotions",
        isPublic: true,
      }),
  });
  return (
    <div className="vip-page bg-gray-900 min-h-screen pb-10">
      <HeroV2 />
      {/* <VipFilterBar options={filterOptions} /> */}
      <div className="!max-w-[1200px] mx-auto px-4 py-8">
        <PromotionList
          promotions={
            Array.isArray(promotionList?.data) && promotionList?.data.length > 0
              ? promotionList?.data.map((promo) => ({
                  image: promo?.bannerImg || "/fallback-image.jpg", // fallback image
                  title: promo?.promotionName || "Untitled Promotion",
                  description:
                    promo?.description || "No description available.",
                  tag: Array.isArray(promo?.promotionType?.data)
                    ? promo?.promotionType?.data
                    : [],
                  time: promo?.dateRange || "Date not available",
                  signupLink: "/register",
                  detailsLink: `/promotions/${promo?.id || "unknown"}`,
                }))
              : []
          }
        />
      </div>
      <SeoSection title={seoTitle} content={seoContent} />
      <Sponsors />
    </div>
  );
};

export default PromotionPage;
