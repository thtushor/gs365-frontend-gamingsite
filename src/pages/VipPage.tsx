import React from "react";
import SeoSection from "../components/Layout/SeoSection";
import Sponsors from "../components/Sponsors";
import { seoContent, seoTitle } from "../lib/mock";
import { HiUserGroup, HiGift, HiCurrencyDollar } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
// import VipFilterBar from "../components/UI/VipFilterBar";

// const filterOptions = [
//   { label: "অল", value: "all" },
//   { label: "ওয়েলকাম অফার", value: "welcome" },
//   { label: "স্লট", value: "slot" },
//   { label: "ক্যাসিনো", value: "casino" },
//   { label: "স্পোর্ট", value: "sport" },
//   { label: "ফিশিং", value: "fishing" },
//   { label: "Card Game", value: "cardgame" },
//   { label: "ESports", value: "esports" },
//   { label: "লটারি", value: "lottery" },
//   { label: "P2P", value: "p2p" },
//   { label: "টেবিল", value: "table" },
//   { label: "আর্কেড", value: "arcade" },
//   { label: "মোরগ লড়াই", value: "cockfight" },
//   { label: "বৃষ্টি", value: "rain" },
//   { label: "ক্রাশ", value: "crash" },
//   { label: "ui.text.fe.game_type.free", value: "free" },
//   { label: "Tips", value: "tips" },
//   { label: "অন্যান্য", value: "other" },
// ];

const vipPrivileges = [
  {
    icon: <HiUserGroup className="text-yellow-400 text-5xl mb-4" />,
    title: "24/7 পারসোনাল ভিআইপি ম্যানেজার",
    description:
      "আমাদের পারসোনাল ভিআইপি ম্যানেজারের এক নম্বর লক্ষ্য হল দ্রুত এবং অতুলনীয় ব্যক্তিগত সার্ভিস প্রদানের মাধ্যমে আপনার অভিজ্ঞতাকে উন্নত করে তোলা। আপনি ভিআইপি লাইভচ্যাট, টেলিগ্রাম, বা ইমেলের মাধ্যমে আপনার 24/7 পারসোনাল ভিআইপি ম্যানেজারের সাথে যোগাযোগ করতে সক্ষম হবেন।",
  },
  {
    icon: <HiGift className="text-pink-400 text-5xl mb-4" />,
    title: "ভিআইপি এক্সক্লুসিভ রিওয়ার্ড",
    description:
      "এক্সট্রা কিছু পেতে কে না পছন্দ করে? এক্সক্লুসিভ রিওয়ার্ড সহ ক্যাসিনোতে আনন্দ বৃদ্ধি করতে আপনার পথেই থাকুন! এক্সক্লুসিভ অফার থেকে উপকৃত হওয়ার সুযোগ পাওয়া মানে হল আমাদের Baji ভিআইপি ক্লাবে যোগদানের সবচেয়ে বড় সুবিধাগুলির মধ্যে একটি। আমরা সারা বছর ধরে প্রচুর পরিমাণে বোনাস, ক্যাশ প্রাইজ, লেভেল আপ রিওয়ার্ড এবং চমক গিফট দিয়ে থাকি।",
  },
  {
    icon: <HiCurrencyDollar className="text-green-400 text-5xl mb-4" />,
    title: "'ভিআইপি পয়েন্টস টু ক্যাশ' রিডেম্পশন",
    description:
      "আপনি কোন সীমাবদ্ধতা ছাড়াই ক্যাশের সাথে আপনার ভিআইপি পয়েন্ট এক্সচেঞ্জ করতে পারবেন। আপনি যখন Baji-তে খেলবেন বা বেট ধরবেন, তখন আপনি ভিআইপি পয়েন্ট অর্জন করবেন, এটি একটি বিনিময়যোগ্য কারেন্সি যা Baji-র সকল প্রোডাক্ট জুড়ে অতিরিক্ত ক্যাশ উপার্জন করতে ব্যবহার করা যাবে!",
  },
  {
    icon: <MdPayment className="text-blue-400 text-5xl mb-4" />,
    title: "ভিআইপি পেমেন্ট চ্যানেল",
    description:
      "আপনি যখন জিতবেন, আপনি দ্রুত টাকা উইথড্র করতে চান। একজন ভিআইপি হিসাবে, আপনি অগ্রাধিকারমূলক উইথড্র এবং ডিপোজিট উপভোগ করবেন। এর মানে আপনি প্রায়োরিটি লেন অনুযায়ী যত খুশি টাকা উইথড্র এবং ডিপোজিট করতে পারবেন!",
  },
];

const VipPage: React.FC = () => {
  return (
    <div className="vip-page bg-gray-900 min-h-screen pb-10">
      <div className="w-full mx-auto mb-6">
        <a href="#">
          <div
            className="w-full h-[200px] md:h-[500px] bg-cover bg-center bg-no-repeat rounded-lg"
            style={{
              backgroundImage: `url(https://lh7-rt.googleusercontent.com/docsz/AD_4nXdFErQgUQKF5vPmgWEaRlbCeln2IxGSiHJ5auC9k90TSJv8Ie57LiPR7HZA5szK75L8BEQVYd4_q1RQeUR-doAa1Y4xCrhHAFiq6lYgYeLrkezEKTc3qigsquf-AY57QNXUwR40?key=ydb9FianOk5tINzTuCEKdjdc)`,
            }}
          />
        </a>
      </div>
      {/* <VipFilterBar options={filterOptions} /> */}
      <div className="vip-privileges-section-attractive max-w-5xl mx-auto">
        <h2 className="vip-privileges-title text-2xl md:text-3xl font-bold text-yellow-200 mb-8 text-center">
          ভিআইপি এর বিশেষ সুবিধা
        </h2>
        <div className="vip-privileges-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {vipPrivileges.map((priv, idx) => (
            <div
              className="vip-privilege-card bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-2 border-yellow-700 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              key={idx}
            >
              {priv.icon}
              <div className="vip-privilege-content">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">
                  {priv.title}
                </h3>
                <p className="text-gray-100 leading-relaxed">
                  {priv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SeoSection title={seoTitle} content={seoContent} />
      <Sponsors />
    </div>
  );
};

export default VipPage;
