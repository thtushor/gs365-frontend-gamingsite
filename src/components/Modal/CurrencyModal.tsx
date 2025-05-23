import React from "react";
import "./CurrencyModal.scss";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-green-700 rounded-t-lg">
          <h3 className="text-white font-bold text-lg">কারেন্সি এবং ভাষা</h3>
          <button onClick={onClose} className="text-white text-2xl font-bold">
            &times;
          </button>
        </div>
        {/* List */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <ul className="space-y-2">
            {currencyLanguages.map((item) => (
              <li
                key={item.code}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex items-center gap-2 min-w-[110px]">
                  <img
                    src={item.flag}
                    alt={item.code}
                    className="w-7 h-7 rounded"
                  />
                  <p className="font-bold flex flex-col text-sm">
                    <span>{item.symbol}</span>
                    {item.code}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {item.languages.map((lang) => (
                    <label key={lang.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`lang-${item.code}`}
                        checked={
                          value.currency === item.code &&
                          value.language === lang.value
                        }
                        onChange={() =>
                          onChange({
                            currency: item.code,
                            language: lang.value,
                          })
                        }
                        className="hidden"
                      />
                      <span
                        className={`px-3 py-1 border rounded transition text-sm font-semibold ${
                          value.currency === item.code &&
                          value.language === lang.value
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-green-100"
                        }`}
                      >
                        {lang.label}
                      </span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
