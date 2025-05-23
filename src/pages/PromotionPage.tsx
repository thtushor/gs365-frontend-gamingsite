import React from "react";
import SeoSection from "../components/Layout/SeoSection";
import Sponsors from "../components/Sponsors";
import { seoContent, seoTitle, filterOptions } from "../lib/mock";

import { HeroV2 } from "../components/Hero/HeroV2";
import VipFilterBar from "../components/UI/VipFilterBar";
import PromotionList from "../components/Promotion/PromotionList";

const baseImages = [
  "https://img.b112j.com/upload/announcement/image_224453.jpg",
  "https://img.b112j.com/upload/announcement/image_223207.jpg",
  "https://img.b112j.com/upload/announcement/image_222925.jpg",
  "https://img.b112j.com/upload/announcement/image_225502.jpg",
  "https://img.b112j.com/upload/announcement/image_223392.jpg",
  "https://img.b112j.com/upload/announcement/image_223346.jpg",
  "https://img.b112j.com/upload/announcement/image_223664.jpg",
  "https://img.b112j.com/upload/announcement/image_225729.jpg",
  "https://img.b112j.com/upload/announcement/image_220843.jpg",
  "https://img.b112j.com/upload/announcement/image_216108.jpg",
  "https://img.b112j.com/upload/announcement/image_218289.jpg",
  "https://img.b112j.com/upload/announcement/image_224255.jpg",
  "https://img.b112j.com/upload/announcement/image_225375.jpg",
  "https://img.b112j.com/upload/announcement/image_172574.jpg",
  "https://img.b112j.com/upload/announcement/image_148700.jpg",
  "https://img.b112j.com/upload/announcement/image_130593.jpg",
  "https://img.b112j.com/upload/announcement/image_227151.jpg",
  "https://img.b112j.com/upload/announcement/image_102194.jpg",
  "https://img.b112j.com/upload/announcement/image_157414.jpg",
  "https://img.b112j.com/upload/announcement/image_214975.jpg",
  "https://img.b112j.com/upload/announcement/image_228969.jpg",
  "https://img.b112j.com/upload/announcement/image_225369.jpg",
  "https://img.b112j.com/upload/announcement/image_177498.jpg",
  "https://img.b112j.com/upload/announcement/image_214373.jpg",
  "https://img.b112j.com/upload/announcement/image_228286.jpg",
  "https://img.b112j.com/upload/announcement/image_228292.jpg",
  "https://img.b112j.com/upload/announcement/image_228280.jpg",
  "https://img.b112j.com/upload/announcement/image_228250.jpg",
  "https://img.b112j.com/upload/announcement/image_228599.jpg",
  "https://img.b112j.com/upload/announcement/image_227706.png",
  "https://img.b112j.com/upload/announcement/image_215068.jpg",
  "https://img.b112j.com/upload/announcement/image_176283.jpg",
  "https://img.b112j.com/upload/announcement/image_172358.jpg",
  "https://img.b112j.com/upload/announcement/image_180290.jpg",
  "https://img.b112j.com/upload/announcement/image_227712.png",
  "https://img.b112j.com/upload/announcement/image_227718.png",
  "https://img.b112j.com/upload/announcement/image_227724.png",
  "https://img.b112j.com/upload/announcement/image_68178.jpg",
];

const samplePromotions = Array.from({ length: 52 }).map((_, i) => ({
  image: baseImages[i % baseImages.length],
  title: `প্রমোশন ${i + 1} - আকর্ষণীয় অফার!`,
  description: `এটি একটি ডেমো প্রমোশন বর্ণনা, নম্বর ${i + 1}.`,
  tag: i % 3 === 0 ? "দীর্ঘ মেয়াদী" : i % 3 === 1 ? "শেষ ৫ দিন" : "নতুন",
  time: `2025/03/${(i % 28) + 1} 18:00:00 ~ 2025/12/31 23:59:59`,
  signupLink: "/page/guest/register.jsp",
  detailsLink: `/details/${100000 + i}`,
}));

const PromotionPage: React.FC = () => {
  return (
    <div className="vip-page bg-gray-900 min-h-screen pb-10">
      <HeroV2 />
      <VipFilterBar options={filterOptions} />
      <div className="!max-w-[1200px] mx-auto px-4 py-8">
        <PromotionList promotions={samplePromotions} />
      </div>
      <SeoSection title={seoTitle} content={seoContent} />
      <Sponsors />
    </div>
  );
};

export default PromotionPage;
