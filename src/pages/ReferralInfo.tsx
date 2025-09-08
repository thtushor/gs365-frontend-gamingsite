import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseModal from "../components/Promotion/BaseModal";
import ReferRules from "../components/InnerComponent/ReferRules";
import { useAuth } from "../contexts/auth-context";

interface BannerItem {
  id: string;
  imageUrl: string;
  link?: string;
}

const leaderboard = [
  {
    rank: 2,
    name: "m****9",
    bonus: "11,936.72",
    img: "https://img.b112j.com/images/web/referral-program/avatar2.png",
    bg: "https://img.b112j.com/images/web/referral-program/referral-program-leaderboard-rank2.png",
  },
  {
    rank: 1,
    name: "e****90",
    bonus: "27,698.53",
    img: "https://img.b112j.com/images/web/referral-program/avatar1.png",
    bg: "https://img.b112j.com/images/web/referral-program/referral-program-leaderboard-rank1.png",
  },
  {
    rank: 3,
    name: "sa****50",
    bonus: "10,649.82",
    img: "https://img.b112j.com/images/web/referral-program/avatar3.png",
    bg: "https://img.b112j.com/images/web/referral-program/referral-program-leaderboard-rank3.png",
  },
];

const bonusList = [
  { name: "radul67", bonus: "16.51", date: "2025/05/23 23:32:17" },
  { name: "hi4", bonus: "29.27", date: "2025/05/23 23:34:08" },
  { name: "opal", bonus: "21.43", date: "2025/05/23 23:34:11" },
  { name: "sel198", bonus: "123.49", date: "2025/05/23 23:35:54" },
  { name: "ued", bonus: "12.74", date: "2025/05/23 23:34:53" },
  { name: "lure", bonus: "87.99", date: "2025/05/23 23:32:51" },
  { name: "mun1110", bonus: "85.47", date: "2025/05/23 23:36:28" },
];

const commissionTabs = [
  {
    label: "range1",
    title: "Range 1",
    turnover_range: "more than 100",
    levels: [
      { level: "Tier1", value: "0.1%" },
      { level: "Tier2", value: "0.05%" },
      { level: "Tier3", value: "0.01%" },
    ],
  },
  {
    label: "range2",
    title: "Range 2",
    turnover_range: "more than 200,000",
    levels: [
      { level: "Tier1", value: "0.15%" },
      { level: "Tier2", value: "0.06%" },
      { level: "Tier3", value: "0.02%" },
    ],
  },
  {
    label: "range3",
    title: "Range 3",
    turnover_range: "more than 500,000",
    levels: [
      { level: "Tier1", value: "0.2%" },
      { level: "Tier2", value: "0.07%" },
      { level: "Tier3", value: "0.03%" },
    ],
  },
];

// Custom hook for intersection observer
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
}

// BonusRow component for animation
const BonusRow: React.FC<{ name: string; bonus: string; date: string }> = ({
  name,
  bonus,
  date,
}) => {
  const [ref, isInView] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`flex justify-between items-center bg-[#181818] rounded px-2 py-1 text-sm transition-all duration-700 ease-out w-full ${
        isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{ willChange: "opacity, transform" }}
    >
      <span className="text-white w-1/3 truncate">{name}</span>
      <span className="text-yellow-400 w-1/3 text-center">{bonus} BDT</span>
      <span className="text-gray-400 w-1/3 text-right">{date}</span>
    </div>
  );
};

const ReferralInfo: React.FC = () => {
  const { user } = useAuth();
  const bannerItems: BannerItem[] = [
    {
      id: "message-message-125716",
      imageUrl: "https://betvisa88.online/all-data/referral-web.jpg",
      link: "#",
    },
  ];

  const [activeTab, setActiveTab] = React.useState(0);

  // states
  const [pageActiveTab, setPageActiveTab] = useState("info");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Baji Live",
          text: "Check out this link!",
          url: `https://gamestar365.com?refCode=${user?.refer_code}`,
        })
        .then(() => console.log("Link shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Share not supported on this browser.");
    }
  };

  return (
    <div className="reference-page bg-[#181818] rounded-md min-h-screen py-6">
      {/* Banner */}
      <div className="w-full mx-auto mb-6">
        <a href="#">
          <div
            className="w-full h-[200px] md:h-[400px] bg-cover bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url(${bannerItems[0].imageUrl})` }}
          />
        </a>
      </div>

      {user && (
        <div className="referral-container max-w-6xl mx-auto  px-5">
          <div className="border-b second-border mb-5">
            <div className=" max-w-[320px]  flex">
              <div
                onClick={() => {
                  navigate("/profile/referral-info");
                  setPageActiveTab("info");
                }}
                className={`border-b-[3px] border-transparent ${
                  pageActiveTab === "info"
                    ? "border-yellow-400 text-yellow-400"
                    : ""
                } hover:border-yellow-200 w-full cursor-pointer`}
              >
                <p className="font-semibold text-[18px]">Info</p>
              </div>
              <div
                onClick={() => {
                  navigate("/profile/referral-details");
                  setPageActiveTab("details");
                }}
                className={`border-b-[3px] border-transparent ${
                  pageActiveTab === "details"
                    ? "border-yellow-400 text-yellow-400"
                    : ""
                } hover:border-yellow-200 w-full cursor-pointer`}
              >
                <p className="font-semibold text-[18px]">Details</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Referral Program Section */}
      <div className="referral-container max-w-6xl mx-auto grid grid-cols-1 pt-0 p-5 md:grid-cols-3 gap-6 rounded-lg">
        {/* Left: Steps & Info */}
        <div className="col-span-full flex flex-col gap-6 ">
          {/* Program Info */}
          <div className="bg-[#232323] rounded-lg p-4 text-left p-5">
            <div className="text-white text-xl font-bold mb-2">
              How does our Referral Program work?
            </div>
            <div className="text-gray-300 mb-2">
              You can earn cash rewards up to three referral tiers when you
              refer your friends.
              <br />
              Invite your friends to join together and be entitled for lifetime
              cash rewards each time your friends place a bet.
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-yellow-400 border-yellow-400"
            >
              Rules
            </button>
          </div>

          {/* Commission Rules */}
          <div className="bg-[#232323] rounded-lg p-5 text-left">
            <div className="text-white text-xl font-bold mb-2">
              Cash reward ratio
            </div>
            <div className="text-gray-300 mb-2">
              Turnover Range : {commissionTabs[activeTab]?.turnover_range || 0}
            </div>
            <div className="flex gap-2 mb-4">
              {commissionTabs.map((tab, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-1 rounded ${
                    activeTab === idx
                      ? "bg-yellow-500 text-black font-bold"
                      : "bg-[#181818] text-white"
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {commissionTabs[activeTab].levels.map((level, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#181818] rounded-lg p-4 flex flex-col items-center"
                >
                  <div className="text-white font-semibold">{level.level}</div>
                  <div className="text-yellow-400 text-2xl font-bold">
                    {level.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Steps */}
          <div className="bg-[#232323] rounded-lg p-5">
            <div className="text-white text-xl font-bold mb-4">
              How to earn more rewards?
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Step 1 */}
              <div className="flex flex-col items-center bg-[#181818] rounded-lg p-4 flex-1">
                <img
                  src="https://img.b112j.com/images/web/referral-program/referral-program-flowch-1.png"
                  alt="step1"
                  className="w-16 h-16 mb-2"
                />
                <div className="text-yellow-400 text-2xl font-bold">1</div>
                <div className="text-white font-semibold mt-2">
                  Send an invitation
                </div>
                <div className="text-gray-300 text-sm">
                  to start your referral journey
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center bg-[#181818] rounded-lg p-4 flex-1">
                <img
                  src="https://img.b112j.com/images/web/referral-program/referral-program-flowch-2.png"
                  alt="step2"
                  className="w-16 h-16 mb-2"
                />
                <div className="text-yellow-400 text-2xl font-bold">2</div>
                <div className="text-white font-semibold mt-2">
                  Friend registration
                </div>
                <div className="text-gray-300 text-sm">with bets placed</div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center bg-[#181818] rounded-lg p-4 flex-1">
                <img
                  src="https://img.b112j.com/images/web/referral-program/referral-program-flowch-3.png"
                  alt="step3"
                  className="w-16 h-16 mb-2"
                />
                <div className="text-yellow-400 text-2xl font-bold">3</div>
                <div className="text-white font-semibold mt-2">
                  Start earning unlimited cash daily
                </div>
                <div className="text-gray-300 text-sm">
                  without doing a thing.
                </div>
              </div>
            </div>

            {user && (
              <button
                onClick={handleShare}
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition"
              >
                Refer a friend now
              </button>
            )}
          </div>
        </div>
        {/* Right: Leaderboard */}
        <div className="bg-[#232323] rounded-lg p-5 pb-6 flex flex-col md:flex-row gap-4 col-span-full">
          <div>
            <div className="text-white text-xl text-left font-bold mb-10">
              Referral leaderboard
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {leaderboard.map((user, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col items-center w-28 ${
                    user.rank === 1 ? "scale-110 z-10" : ""
                  }`}
                >
                  <img
                    src={user.bg}
                    alt={`rank-bg-${user.rank}`}
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-lg"
                  />
                  <div className="relative z-10 flex flex-col items-center pt-6 pb-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 mb-2">
                      <img
                        src={user.img}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-white font-bold">{user.name}</div>
                    <div className="text-yellow-400 font-bold">
                      {user.bonus}
                    </div>
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow">
                    TOP {user.rank}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" w-full ">
            <div className="text-white text-lg text-left font-bold mb-5">
              Who received the bonus?
            </div>
            <div className="w-full  max-h-64 overflow-y-auto lg:max-w-full md:max-w-[320px] rounded shadow-inner border border-gray-600">
              <div className="w-full min-w-[400px]">
                <div className="flex font-semibold text-yellow-400 border-b border-gray-700 px-2 py-1">
                  <span className="w-1/3">Name</span>
                  <span className="w-1/3 text-center">Bonus</span>
                  <span className="w-1/3 text-right">Date</span>
                </div>
                {bonusList.map((item, idx) => (
                  <BonusRow
                    key={idx}
                    name={item.name}
                    bonus={item.bonus}
                    date={item.date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BaseModal
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        children={<ReferRules />}
      />
    </div>
  );
};

export default ReferralInfo;
