import React from "react";
import SeoSection from "../components/Layout/SeoSection";
import Sponsors from "../components/Sponsors";
import { seoContent, seoTitle, filterOptions } from "../lib/mock";

import { HeroV2 } from "../components/Hero/HeroV2";
import VipFilterBar from "../components/UI/VipFilterBar";

const PromotionPage: React.FC = () => {
  return (
    <div className="vip-page bg-gray-900 min-h-screen pb-10">
      <HeroV2 />
      <VipFilterBar options={filterOptions} />
      <SeoSection title={seoTitle} content={seoContent} />
      <Sponsors />
    </div>
  );
};

export default PromotionPage;
