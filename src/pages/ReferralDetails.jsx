import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { LuCopy } from "react-icons/lu";
import { toast } from "react-toastify";
import { BsInfoCircle } from "react-icons/bs";
import BaseModal from "../components/Promotion/BaseModal";
import ActiveDownlines from "../components/InnerComponent/ActiveDownlines";
import { useAuth } from "../contexts/auth-context";

const ReferralDetails = () => {
  const { user } = useAuth();
  const bannerItems = [
    {
      id: "message-message-125716",
      imageUrl: "https://betvisa88.online/all-data/referral-web.jpg",
      link: "#",
    },
  ];

  // states
  const [activeTab, setActiveTab] = useState("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Get current URL and user's referral code
  const currentUrl = window.location.origin;
  const userReferCode = user?.refer_code || "N/A"; // fallback to default if no user data
  const referralLink = `${currentUrl}/register?refcode=${userReferCode}`;

  // functionality
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // toast.success("Referral Code is Copied!");
    console.log("Referral code is copied!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Gamestar 365",
          text: "Check out this link!",
          url: referralLink,
        })
        .then(() => console.log("Link shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Share not supported on this browser.");
    }
  };

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
      <div className="referral-container max-w-6xl mx-auto px-5">
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

        <div className="flex gap-5 justify-between light-bg p-7 rounded-lg flex-col md:flex-row">
          <div className="flex items-center md:justify-between md:max-w-[250px] lg:max-w-[300px] w-full gap-5">
            <div
              style={{
                height: "auto",
                maxWidth: 90,
                width: "100%",
              }}
              className="bg-white p-2 rounded-md"
            >
              <QRCode
                size={300}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={referralLink}
                viewBox={`0 0 300 300`}
              />
            </div>
            <div className="flex items-center flex-col">
              <p className="text-[16px] text-opacity-40 text-white">
                Your referral code
              </p>
              <div
                className="flex items-end text-yellow-400 gap-2 cursor-pointer"
                onClick={() => handleCopy(userReferCode)}
              >
                <p className="text-[22px]  font-bold clear-start mb-[-3px]">
                  {userReferCode}
                </p>
                <LuCopy size={22} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 w-full max-w-[700px]">
            <button
              onClick={() => handleCopy(referralLink)}
              className="border border-yellow-400 w-full py-4 text-xl font-medium"
            >
              Copy Link
            </button>
            <button
              onClick={handleShare}
              className="border border-yellow-400 w-full py-4 text-xl font-medium"
            >
              Share
            </button>
          </div>
        </div>
        <div className="bg-yellow-400 p-5 py-3 rounded-md mt-5 items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-gray-700 font-medium p-5 flex flex-col gap-1 items-center col-span-full lg:col-span-1 ">
            <h1 className="text-[50px]">0</h1>
            <p
              className=" gap-1 flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              Active downlines <BsInfoCircle />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full col-span-full lg:col-span-3">
            <div className="second-bg p-5 py-3 rounded-md">
              <p className="text-[18px] font-medium text-left">
                Lifetime cash rewards
              </p>
              <h1 className="text-[25px] font-bold text-right mt-3 text-yellow-400">
                14000
              </h1>
            </div>
            <div className="second-bg p-5 py-3 rounded-md">
              <p className="text-[18px] font-medium text-left">
                Referral turnover
              </p>
              <h1 className="text-[25px] font-bold text-right mt-3 text-yellow-400">
                14000
              </h1>
            </div>
            <div className="second-bg p-5 py-3 rounded-md">
              <p className="text-[18px] font-medium text-left">Cash rewards</p>
              <h1 className="text-[25px] font-bold text-right mt-3 text-yellow-400">
                14000
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() =>
              navigate("/profile/referral-details/cash-reward-history")
            }
            className="bg-yellow-400 hover:bg-yellow-600 hover:border-transparent rounded-md text-black !font-bold w-full sm:max-w-[400px] mt-5"
          >
            Cash reward history
          </button>
        </div>
      </div>

      <BaseModal
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        children={<ActiveDownlines />}
      />
    </div>
  );
};

export default ReferralDetails;
