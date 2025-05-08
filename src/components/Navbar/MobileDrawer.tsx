import React, { useState } from "react";
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
  FaChevronLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { key: "home", icon: <FaHome />, label: "হোম" },
  { key: "exclusive", icon: <FaGift />, label: "এক্সক্লুসিভ" },
  { key: "sports", icon: <FaFutbol />, label: "স্পোর্ট" },
  { key: "casino", icon: <FaDice />, label: "ক্যাসিনো" },
  { key: "stat", icon: <FaTableTennis />, label: "স্ট্যাট" },
  { key: "tennis", icon: <FaTrophy />, label: "টেনিস" },
  { key: "crash", icon: <FaTrophy />, label: "ক্রাশ" },
  { key: "fishing", icon: <FaFish />, label: "ফিশিং" },
  { key: "arcade", icon: <FaGamepad />, label: "আর্কেড" },
  { key: "lottery", icon: <FaTicketAlt />, label: "লটারি" },
  { key: "promotion", icon: <FaBullhorn />, label: "প্রমোশন" },
  { key: "refer", icon: <FaUserShield />, label: "রেফারেন্ড প্রোগ্রাম" },
];

const subOptions: Record<string, string[]> = {
  home: ["Dashboard", "Profile", "Settings"],
  exclusive: ["Offer 1", "Offer 2"],
  sports: ["Football", "Cricket", "Tennis"],
  casino: ["Live Casino", "Slots", "Roulette"],
  stat: ["Stats 1", "Stats 2"],
  tennis: ["ATP", "WTA"],
  crash: ["Crash Game 1", "Crash Game 2"],
  fishing: ["Fishing Game 1", "Fishing Game 2"],
  arcade: ["Arcade 1", "Arcade 2"],
  lottery: ["Lottery 1", "Lottery 2"],
  promotion: ["Promo 1", "Promo 2"],
  refer: ["Refer a Friend", "Rewards"],
};

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div
      className={`fixed inset-0 z-[99999] transition-all duration-300 ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Drawer Container */}
      <div className="fixed top-0 left-0 h-full w-full flex">
        {/* Main Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: -220, opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -220, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[200px] min-w-[200px] max-w-[200px] flex flex-col"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-r-2xl pointer-events-none z-0 bg-gradient-to-br from-[#ff9f1c] via-[#2c8f3d] to-[#074ce3] opacity-70 blur-[2px]" />
              <div className="relative z-10 h-full bg-[#23272F] bg-opacity-90 backdrop-blur-md border-r border-gray-800 shadow-2xl rounded-r-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white drop-shadow-[0_0_8px_#ff9f1c] animate-pulse">
                      GBET
                    </span>
                    {/* <span className="text-xs bg-[#ff9f1c] text-white rounded px-2 py-0.5 ml-1 shadow-md">
                      Brand New Version
                    </span> */}
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
                    {menuItems.map((item) => (
                      <li key={item.key}>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#31343c] hover:scale-105 hover:shadow-lg hover:border-l-4 hover:border-[#ff9f1c] active:scale-95 transition text-base group"
                          onClick={() => setActiveMenu(item.key)}
                        >
                          <span className="text-lg group-hover:text-[#ff9f1c] drop-shadow-[0_0_6px_#ff9f1c] transition">
                            {item.icon}
                          </span>
                          <span className="flex-1 text-left group-hover:text-[#ff9f1c] transition drop-shadow-[0_0_6px_#ff9f1c]">
                            {item.label}
                          </span>
                          <span className="text-xs text-gray-400">›</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Secondary Drawer */}
        <AnimatePresence>
          {activeMenu && open && (
            <motion.div
              initial={{ x: 220, opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 220, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[160px] min-w-[160px] max-w-[160px] flex flex-col"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-r-2xl pointer-events-none z-0 bg-gradient-to-br from-[#ff9f1c] via-[#2c8f3d] to-[#074ce3] opacity-70 blur-[2px]" />
              <div className="relative z-10 h-full bg-[#23272F] bg-opacity-90 backdrop-blur-md border-l border-gray-800 shadow-2xl rounded-r-2xl flex flex-col">
                <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-700">
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-gray-200 text-lg p-2 rounded hover:bg-gray-700 transition"
                  >
                    <FaChevronLeft />
                  </button>
                  <span className="font-semibold text-white text-lg drop-shadow-[0_0_8px_#ff9f1c]">
                    {menuItems.find((m) => m.key === activeMenu)?.label}
                  </span>
                </div>
                <nav className="flex-1 overflow-y-auto py-2 px-2">
                  <ul className="space-y-1">
                    {subOptions[activeMenu]?.map((sub) => (
                      <li key={sub}>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-[#31343c] hover:scale-105 hover:shadow-lg hover:border-l-4 hover:border-[#ff9f1c] active:scale-95 transition text-base group">
                          <span className="flex-1 text-left group-hover:text-[#ff9f1c] transition drop-shadow-[0_0_6px_#ff9f1c]">
                            {sub}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
