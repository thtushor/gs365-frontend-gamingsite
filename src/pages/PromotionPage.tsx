import React from "react";
import SeoSection from "../components/Layout/SeoSection";
import Sponsors from "../components/Sponsors";
import { seoContent, seoTitle, filterOptions } from "../lib/mock";

import { HeroV2 } from "../components/Hero/HeroV2";
import VipFilterBar from "../components/UI/VipFilterBar";
import PromotionList from "../components/Promotion/PromotionList";

const samplePromotions = [
  {
    image: "https://img.b112j.com/upload/announcement/image_224453.jpg",
    title: "৪% পর্যন্ত আনলিমিটেড বুস্ট",
    description: "ডেইলি অফার",
    tag: "দীর্ঘ মেয়াদী",
    time: "2025/03/26 18:00:00 ~ 2025/12/31 23:59:59",
    signupLink: "/page/guest/register.jsp",
    detailsLink: "/details/128329",
  },
  {
    image: "https://img.b112j.com/upload/announcement/image_223207.jpg",
    title: "Yamaha R15M + ৳২৬৬৫৫ ক্যাশ",
    description: "আইপিএল প্রেডিকশন মাস্টার",
    tag: "শেষ 5 দিন 19 ঘন্টা",
    time: "2025/03/16 20:00:00 ~ 2025/05/28 19:59:59",
    signupLink: "/page/guest/register.jsp",
    detailsLink: "/details/127365",
  },
  {
    image: "https://img.b112j.com/upload/announcement/image_222925.jpg",
    title: "১০০% রিফান্ড বোনাস",
    description: "আইপিএল ২০২৫ ওয়েলকাম অফার",
    tag: "শেষ 11 দিন 23 ঘন্টা",
    time: "2025/03/21 00:00:00 ~ 2025/06/03 23:59:59",
    signupLink: "/page/guest/register.jsp",
    detailsLink: "/details/127181",
  },
  {
    image: "https://img.b112j.com/upload/announcement/image_225502.jpg",
    title: "ক্রিকেট গেমে ফ্রি ৳৭৭৭ বোনাস!",
    description: "PSL ওয়েলকাম অফার",
    tag: "শেষ 2 দিন 23 ঘন্টা",
    time: "2025/04/11 00:00:00 ~ 2025/05/25 23:59:59",
    signupLink: "/page/guest/register.jsp",
    detailsLink: "/details/129225",
  },
];

const PromotionPage: React.FC = () => {
  return (
    <div className="vip-page bg-gray-900 min-h-screen pb-10">
      <HeroV2 />
      <VipFilterBar options={filterOptions} />
      <div className=" mx-auto px-4 py-8">
        <PromotionList promotions={samplePromotions} />
      </div>
      <SeoSection title={seoTitle} content={seoContent} />
      <Sponsors />
    </div>
  );
};

export default PromotionPage;
