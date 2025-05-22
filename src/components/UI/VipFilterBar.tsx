import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface FilterOption {
  label: string;
  value: string;
}

interface VipFilterBarProps {
  options: FilterOption[];
  onChange?: (value: string) => void;
}

const VipFilterBar: React.FC<VipFilterBarProps> = ({ options, onChange }) => {
  const [active, setActive] = useState(options[0]?.value || "");
  const scrollRef = useRef<HTMLUListElement>(null);

  const handleSelect = (value: string) => {
    setActive(value);
    if (onChange) {
      onChange(value);
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 150;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex items-center bg-gray-800 py-3 px-2 rounded-xl mb-8 shadow-md relative">
      <span
        className="flex cursor-pointer items-center justify-center w-8 h-8 rounded-full bg-yellow-700 text-white mr-2 disabled:opacity-50 border-2 border-yellow-400"
        onClick={() => scroll("left")}
        aria-label="Previous"
      >
        <ArrowLeft className="text-white" />
      </span>
      {/* <ArrowLeft className="text-white" /> */}
      <ul
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
        style={{ scrollBehavior: "smooth" }}
      >
        {options.map((opt) => (
          <li key={opt.value} className="flex-shrink-0">
            <button
              className={`px-5 py-2 rounded-lg border transition font-semibold text-white whitespace-nowrap ${
                active === opt.value
                  ? "border-yellow-400 text-yellow-200 bg-gray-900"
                  : "border-transparent hover:border-yellow-400 hover:text-yellow-300"
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
      <span
        className="flex cursor-pointer items-center justify-center w-8 h-8 rounded-full bg-yellow-700 text-white ml-2 disabled:opacity-50 border-2 border-yellow-400"
        onClick={() => scroll("right")}
        aria-label="Next"
      >
        <ArrowRight />
      </span>
    </div>
  );
};

export default VipFilterBar;
