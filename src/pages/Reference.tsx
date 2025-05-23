import React from "react";

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
  { name: "**radul67**", bonus: "16.51", date: "2025/05/23 23:32:17" },
  { name: "**hi4**", bonus: "29.27", date: "2025/05/23 23:34:08" },
  { name: "*opal*", bonus: "21.43", date: "2025/05/23 23:34:11" },
  { name: "**sel198**", bonus: "123.49", date: "2025/05/23 23:35:54" },
  { name: "*ued*", bonus: "12.74", date: "2025/05/23 23:34:53" },
  { name: "**lure**", bonus: "87.99", date: "2025/05/23 23:32:51" },
  { name: "**mun1110**", bonus: "85.47", date: "2025/05/23 23:36:28" },
];

const commissionTabs = [
  {
    label: "tab1",
    levels: [
      { level: "লেভেল ১", value: "0.1%" },
      { level: "লেভেল ২", value: "0.05%" },
      { level: "লেভেল ৩", value: "0.01%" },
    ],
  },
  {
    label: "tab2",
    levels: [
      { level: "লেভেল ১", value: "0.15%" },
      { level: "লেভেল ২", value: "0.06%" },
      { level: "লেভেল ৩", value: "0.02%" },
    ],
  },
  {
    label: "tab3",
    levels: [
      { level: "লেভেল ১", value: "0.2%" },
      { level: "লেভেল ২", value: "0.07%" },
      { level: "লেভেল ৩", value: "0.03%" },
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

const Reference: React.FC = () => {
  const bannerItems: BannerItem[] = [
    {
      id: "message-message-125716",
      imageUrl: "https://img.b112j.com/upload/announcement/image_221254.jpg",
      link: "#",
    },
  ];

  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className="reference-page bg-[#181818] min-h-screen py-6">
      {/* Banner */}
      <div className="w-full mx-auto mb-6">
        <a href="#">
          <div
            className="w-full h-[200px] md:h-[400px] bg-cover bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url(${bannerItems[0].imageUrl})` }}
          />
        </a>
      </div>

      {/* Referral Program Section */}
      <div className="referral-container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#232323] p-6 rounded-lg">
        {/* Left: Steps & Info */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Steps */}
          <div className="bg-[#232323] rounded-lg p-4">
            <div className="text-white text-xl font-bold mb-4">
              কিভাবে আরো প্রাইজ পাবেন?
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Step 1 */}
              <div className="flex flex-col items-center bg-[#181818] rounded-lg p-4 flex-1">
                <img
                  src="https://img.b112j.com/images/web/referral-program/referral-program-flowch-1.png"
                  alt="step1"
                  className="w-16 h-16 mb-2"
                />
                <div className="text-yellow-400 text-2xl font-bold">১</div>
                <div className="text-white font-semibold mt-2">
                  ইনভিটেশন পাঠান
                </div>
                <div className="text-gray-300 text-sm">
                  আপনার রেফারেল জার্নি শুরু করতে
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center bg-[#181818] rounded-lg p-4 flex-1">
                <img
                  src="https://img.b112j.com/images/web/referral-program/referral-program-flowch-2.png"
                  alt="step2"
                  className="w-16 h-16 mb-2"
                />
                <div className="text-yellow-400 text-2xl font-bold">২</div>
                <div className="text-white font-semibold mt-2">
                  ফ্রেন্ড রেজিস্ট্রেশন
                </div>
                <div className="text-gray-300 text-sm">বেট ধরার সাথে</div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center bg-[#181818] rounded-lg p-4 flex-1">
                <img
                  src="https://img.b112j.com/images/web/referral-program/referral-program-flowch-3.png"
                  alt="step3"
                  className="w-16 h-16 mb-2"
                />
                <div className="text-yellow-400 text-2xl font-bold">৩</div>
                <div className="text-white font-semibold mt-2">
                  প্রতিদিন আনলিমিটেড ক্যাশ উপার্জন শুরু করুন
                </div>
                <div className="text-gray-300 text-sm">কিছু না করেই।</div>
              </div>
            </div>
            <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition">
              এখনই রেকমেন্ড করুন
            </button>
          </div>

          {/* Program Info */}
          <div className="bg-[#232323] rounded-lg p-4">
            <div className="text-white text-xl font-bold mb-2">
              রেফারেল প্রোগ্রাম কি?
            </div>
            <div className="text-gray-300 mb-2">
              আপনার বন্ধুকে রেফার করে মোট তিনটি ধাপে ক্যাশ প্রাইজ উপভোগ করতে
              পারেন, আপনার বন্ধুকে একসাথে খেলতে এখনই আমন্ত্রণ জানান!!!
              <br />
              এটি হবে আপনার দীর্ঘমেয়াদী ইনকাম, এবং যতবার তারা বেট ধরবে, ততবারই
              আপনি আলাদা কমিশন এর পার্সেন্টেজ পাবেন।
            </div>
            <button className="text-yellow-400 underline">নিয়মাবলী</button>
          </div>

          {/* Commission Rules */}
          <div className="bg-[#232323] rounded-lg p-4">
            <div className="text-white text-xl font-bold mb-2">
              কমিশনের নিয়ম
            </div>
            <div className="text-gray-300 mb-2">
              Turnover Range : More Than 100
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
                  {tab.label}
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
                  <div className="text-gray-400 text-xs">(পর্যন্ত)</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Leaderboard */}
        <div className="bg-[#232323] rounded-lg p-4 flex flex-col gap-4">
          <div>
            <div className="text-white text-xl font-bold mb-2">
              বোনাস র‍্যাঙ্কিং
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
                    টপ {user.rank}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-white text-lg font-bold mb-2">
              কে বোনাস পেয়েছে?
            </div>
            <div className="w-full max-h-64 overflow-y-auto rounded shadow-inner">
              <div className="w-full min-w-[400px]">
                <div className="flex font-semibold text-yellow-400 border-b border-gray-700 px-2 py-1">
                  <span className="w-1/3">নাম</span>
                  <span className="w-1/3 text-center">বোনাস</span>
                  <span className="w-1/3 text-right">তারিখ</span>
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
    </div>
  );
};

export default Reference;
