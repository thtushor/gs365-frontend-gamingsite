import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReferralDetails = () => {
  const bannerItems = [
    {
      id: "message-message-125716",
      imageUrl: "https://betvisa88.online/all-data/referral-web.jpg",
      link: "#",
    },
  ];

  // states
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();

  // functionality
  return (
    <div className="reference-page bg-[#181818] min-h-screen py-6">
      <div className="w-full mx-auto mb-6">
        <a href="#">
          <div
            className="w-full h-[200px] md:h-[400px] bg-cover bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url(${bannerItems[0].imageUrl})` }}
          />
        </a>
      </div>
      <div className="referral-container max-w-6xl mx-auto">
        <div className="border-b second-border mb-5">
          <div className=" max-w-[320px]  flex">
            <div
              onClick={() => {
                navigate("/profile/referral-info");
                setActiveTab("info");
              }}
              className={`border-b-[3px] border-transparent ${
                activeTab === "info" ? "border-yellow-400 text-yellow-400" : ""
              } hover:border-yellow-200 w-full cursor-pointer`}
            >
              <p className="font-semibold text-[18px]">Info</p>
            </div>
            <div
              onClick={() => {
                navigate("/profile/referral-details");
                setActiveTab("details");
              }}
              className={`border-b-[3px] border-transparent ${
                activeTab === "details"
                  ? "border-yellow-400 text-yellow-400"
                  : ""
              } hover:border-yellow-200 w-full cursor-pointer`}
            >
              <p className="font-semibold text-[18px]">Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralDetails;
