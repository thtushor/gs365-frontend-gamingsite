import React from "react";
import {
  FaTimes,
  FaHome,
  FaGift,
  FaFutbol,
  FaDice,
  FaTableTennis,
  FaTrophy,
  FaFish,
  FaGamepad,
  FaTicketAlt,
  FaBullhorn,
  FaUserShield,
} from "react-icons/fa";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: <FaHome />, label: "হোম" },
  { icon: <FaGift />, label: "এক্সক্লুসিভ" },
  { icon: <FaFutbol />, label: "স্পোর্ট" },
  { icon: <FaDice />, label: "ক্যাসিনো" },
  { icon: <FaTableTennis />, label: "স্ট্যাট" },
  { icon: <FaTrophy />, label: "টেনিস" },
  { icon: <FaTrophy />, label: "ক্রাশ" },
  { icon: <FaFish />, label: "ফিশিং" },
  { icon: <FaGamepad />, label: "আর্কেড" },
  { icon: <FaTicketAlt />, label: "লটারি" },
  { icon: <FaBullhorn />, label: "প্রমোশন" },
  { icon: <FaUserShield />, label: "রেফারেন্ড প্রোগ্রাম" },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-0 z-[99999] transition-all duration-300 ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-full bg-[#23272F] rounded-r-2xl shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
        style={{ minWidth: 260 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">baji</span>
            <span className="text-xs bg-[#ff9f1c] text-white rounded px-2 py-0.5 ml-1">
              Brand New Version
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white text-xl p-2 rounded hover:bg-gray-700 transition"
          >
            <FaTimes />
          </button>
        </div>
        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          <ul className="space-y-1">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#31343c] transition text-base">
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
