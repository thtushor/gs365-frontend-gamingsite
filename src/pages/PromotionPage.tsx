import React from "react";
import SeoSection from "../components/Layout/SeoSection";
import { seoContent, seoTitle, filterOptions } from "../lib/mock";

import VipFilterBar from "../components/UI/VipFilterBar";
import PromotionList from "../components/Promotion/PromotionList";
import { HeroV2 } from "../components/Hero/HeroV2"; 
import Sponsors from "../components/Sponsors";

const promotions = [
  {
    id: "promo_001",
    title: "Up to 4% Unlimited Boost",
    tagline: "Just 1X Wagering! Up to 4% Extra on Every Deposit",
    categories: [
      "Slots",
      "Casino",
      "Sports",
      "Fishing",
      "E-sports",
      "Lottery",
      "Table",
      "Arcade",
      "Crash",
    ],
    duration: {
      start: "2025-03-26T18:00:00+06:00",
      end: "2025-12-31T23:59:59+06:00",
    },
    short_description:
      "Earn up to 4% extra on every deposit with minimal wagering requirement.",
    banner_image_desktop:
      "https://img.b112j.com/upload/announcement/image_130593.jpg",
    banner_image_mobile:
      "https://img.b112j.com/upload/announcement/image_130593.jpg",
  },
  {
    id: "promo_002",
    title: "৳10,000 1st Week Refund Bonus",
    tagline: "T20 Blast Welcome Offer - Risk-Free First Week",
    categories: ["Welcome Offer", "Sports", "FDB"],
    duration: {
      start: "2025-05-29T00:00:00+06:00",
      end: "2025-09-14T23:59:59+06:00",
    },
    short_description:
      "Join today and get a refund up to ৳10,000 if you lose during your first week!",
    banner_image_desktop:
      "https://img.b112j.com/upload/announcement/image_130593.jpg",
    banner_image_mobile:
      "https://img.b112j.com/upload/announcement/image_130593.jpg",
  },
  {
    id: "promo_003",
    title: "৳10 Crore Prize Pool",
    tagline: "Join Free Contests and Win Big",
    categories: [
      "Slots",
      "Casino",
      "Sports",
      "Fishing",
      "Card",
      "Lottery",
      "Table",
      "Arcade",
      "Crash",
    ],
    duration: {
      start: "2025-05-29T00:00:00+06:00",
      end: "2025-09-14T23:59:59+06:00",
    },
    short_description:
      "Win from a prize pool of ৳10 crore by joining free tournaments and leaderboard events!",
    banner_image_desktop:
      "https://img.b112j.com/upload/announcement/image_130593.jpg",
    banner_image_mobile:
      "https://img.b112j.com/upload/announcement/image_130593.jpg",
  },
];

const PromotionPage: React.FC = () => {
  return (
    <div className="vip-page bg-gray-900 min-h-screen pb-10">
      <HeroV2 />
      <VipFilterBar options={filterOptions} />
      <div className="!max-w-[1200px] mx-auto px-4 py-8">
        <PromotionList
          promotions={
            Array.isArray(promotions) && promotions.length > 0
              ? promotions.map((promo) => ({
                  image: promo?.banner_image_desktop || "/fallback-image.jpg", // fallback image
                  title: promo?.title || "Untitled Promotion",
                  description:
                    promo?.short_description || "No description available.",
                  tag: Array.isArray(promo?.categories) ? promo.categories : [],
                  time:
                    promo?.duration?.start && promo?.duration?.end
                      ? `${new Date(
                          promo.duration.start
                        ).toLocaleDateString()} ~ ${new Date(
                          promo.duration.end
                        ).toLocaleDateString()}`
                      : "Date not available",
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
