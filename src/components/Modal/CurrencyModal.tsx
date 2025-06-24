import React from "react";

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (value: { currency: string; language: string }) => void;
  value: { currency: string; language: string };
}

const currencyLanguages = [
  {
    flag: "https://img.b112j.com/images/web/flag/BD.png",
    symbol: "৳",
    code: "BDT",
    languages: [
      { label: "English", value: "en" },
      { label: "বাংলা", value: "bn" },
    ],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/VN.png",
    symbol: "₫",
    code: "VND",
    languages: [
      { label: "English", value: "en" },
      { label: "Tiếng Việt", value: "vn" },
    ],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/KH.png",
    symbol: "$",
    code: "USD",
    languages: [
      { label: "English", value: "en" },
      { label: "ខេមរភាសា", value: "km" },
      { label: "简体中文", value: "cn" },
    ],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/IN.png",
    symbol: "₹",
    code: "INR",
    languages: [
      { label: "English", value: "en" },
      { label: "हिन्दी", value: "hi" },
      { label: "বাংলা", value: "bn" },
    ],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/PK.png",
    symbol: "₨",
    code: "PKR",
    languages: [{ label: "English", value: "en" }],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/PH.png",
    symbol: "₱",
    code: "PHP",
    languages: [
      { label: "English", value: "en" },
      { label: "Tagalog", value: "tl" },
    ],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/KR.png",
    symbol: "₩",
    code: "KRW",
    languages: [
      { label: "English", value: "en" },
      { label: "한국어", value: "ko" },
    ],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/ID.png",
    symbol: "Rp",
    code: "IDR",
    languages: [
      { label: "English", value: "en" },
      { label: "Indonesia", value: "id" },
    ],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/NP.png",
    symbol: "Rs",
    code: "NPR",
    languages: [
      { label: "English", value: "en" },
      { label: "नेपाली", value: "ne" },
    ],
  },
  {
    flag: "https://img.b112j.com/images/web/flag/TH.png",
    symbol: "฿",
    code: "THB",
    languages: [
      { label: "English", value: "en" },
      { label: "ไทย", value: "th" },
    ],
  },
];

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  onChange,
  value,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-[3px]">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl top-0 left-0 animate-float" />
        <div className="absolute w-60 h-60 bg-green-300/20 rounded-full blur-2xl bottom-0 right-0 animate-float2" />
      </div>
      <div className="relative w-full max-w-lg mx-4 rounded-3xl shadow-2xl border border-green-200 bg-white/70 backdrop-blur-2xl animate-currencyModalIn overflow-hidden">
        {/* Header with animated shine */}
        <div className="relative flex items-center justify-between px-8 py-5 bg-gradient-to-r from-green-600 via-green-500 to-green-400 rounded-t-3xl shadow">
          <div className="flex items-center gap-2">
            <svg
              className="w-7 h-7 text-white opacity-80"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
              <path
                d="M8 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-white font-bold text-xl tracking-wide drop-shadow">
              কারেন্সি এবং ভাষা
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white text-2xl font-bold rounded-full bg-white/10 hover:bg-green-800/80 hover:scale-110 transition p-1 shadow-lg backdrop-blur-md border border-white/30"
            aria-label="Close"
          >
            <span className="inline-block transition-transform hover:rotate-90 duration-300">
              &times;
            </span>
          </button>
          {/* Shine effect */}
          <div className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute left-[-40%] top-0 w-1/2 h-full bg-gradient-to-r from-white/30 via-white/10 to-transparent rotate-12 animate-shine" />
          </div>
        </div>
        {/* List */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <ul className="space-y-5">
            {currencyLanguages.map((item) => (
              <li
                key={item.code}
                className="flex items-center justify-between bg-white/80 rounded-2xl shadow-md border border-gray-100 px-4 py-3 group transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-green-100/80"
              >
                <div className="flex items-center gap-3 min-w-[110px]">
                  <img
                    src={item.flag}
                    alt={item.code}
                    className="w-10 h-10 rounded-full shadow border-2 border-green-100 group-hover:border-green-400 transition"
                  />
                  <div className="font-bold flex flex-col text-base">
                    <span className="text-lg">{item.symbol}</span>
                    <span className="text-gray-700">{item.code}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {item.languages.map((lang) => {
                    const selected =
                      value.currency === item.code &&
                      value.language === lang.value;
                    return (
                      <label
                        key={lang.value}
                        className="cursor-pointer relative"
                      >
                        <input
                          type="radio"
                          name={`lang-${item.code}`}
                          checked={selected}
                          onChange={() =>
                            onChange({
                              currency: item.code,
                              language: lang.value,
                            })
                          }
                          className="hidden"
                        />
                        <span
                          className={`relative px-4 py-1.5 rounded-full text-sm font-semibold shadow transition-all border-2 flex items-center gap-1
                            ${
                              selected
                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-500 scale-110 ring-2 ring-green-300 animate-pulse"
                                : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-green-100 hover:scale-105"
                            }
                          `}
                          style={{
                            boxShadow: selected
                              ? "0 2px 12px 0 rgba(34,197,94,0.18), 0 0px 0px 2px #22c55e33"
                              : "",
                          }}
                        >
                          {lang.label}
                          {selected && (
                            <span className="ml-1 flex items-center justify-center animate-pop">
                              <svg
                                className="w-4 h-4 text-white drop-shadow"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </span>
                        {/* Ripple/shine on hover */}
                        <span className="absolute inset-0 rounded-full pointer-events-none group-hover:animate-shinePill" />
                      </label>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Animation keyframes */}
      <style>
        {`
          @keyframes currencyModalIn {
            0% { opacity: 0; transform: scale(0.95);}
            100% { opacity: 1; transform: scale(1);}
          }
          .animate-currencyModalIn {
            animation: currencyModalIn 0.35s cubic-bezier(.4,0,.2,1);
          }
          @keyframes shine {
            0% { left: -40%; }
            100% { left: 120%; }
          }
          .animate-shine {
            animation: shine 2.5s linear infinite;
          }
          @keyframes pop {
            0% { transform: scale(0.5);}
            80% { transform: scale(1.2);}
            100% { transform: scale(1);}
          }
          .animate-pop {
            animation: pop 0.3s cubic-bezier(.4,0,.2,1);
          }
          @keyframes float {
            0%,100% { transform: translateY(0);}
            50% { transform: translateY(-20px);}
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float2 {
            animation: float 8s ease-in-out infinite;
          }
          @keyframes shinePill {
            0% { background: none;}
            50% { background: linear-gradient(90deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.08) 100%);}
            100% { background: none;}
          }
          .group-hover\\:animate-shinePill:hover .group-hover\\:animate-shinePill {
            animation: shinePill 0.7s;
          }
        `}
      </style>
    </div>
  );
};
