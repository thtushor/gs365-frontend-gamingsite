import React from "react";
import SeoSection from "../components/Layout/SeoSection";
import Sponsors from "../components/Sponsors";
import { seoContent, seoTitle } from "../lib/mock";

const VipPage: React.FC = () => {
  // You can add more components or logic here as needed
  return (
    <div className="vip-page">
      {/* Add your VIP page content/components here */}
      <SeoSection title={seoTitle} content={seoContent} />
      {/* Other VIP content will be added here */}
      <Sponsors />
    </div>
  );
};

export default VipPage;
