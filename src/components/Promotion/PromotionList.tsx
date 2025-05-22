import React from "react";
import PromotionCard from "./PromotionCard";

interface Promotion {
  image: string;
  title: string;
  description: string;
  tag: string;
  time: string;
  signupLink: string;
  detailsLink: string;
}

interface PromotionListProps {
  promotions: Promotion[];
}

const PromotionList: React.FC<PromotionListProps> = ({ promotions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {promotions.map((promo, idx) => (
        <PromotionCard key={idx} {...promo} />
      ))}
    </div>
  );
};

export default PromotionList;
