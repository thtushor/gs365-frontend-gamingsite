import React from "react";
import { FiHome, FiMessageSquare, FiHelpCircle } from "react-icons/fi";
import "./SupportTabBar.scss";

interface SupportTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { key: "home", label: "Home", icon: <FiHome /> },
  { key: "messages", label: "Messages", icon: <FiMessageSquare /> },
  { key: "help", label: "Help", icon: <FiHelpCircle /> },
];

const SupportTabBar: React.FC<SupportTabBarProps> = ({
  activeTab,
  onTabChange,
}) => (
  <div className="support-tab-bar">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        className={`support-tab-bar-btn${
          activeTab === tab.key ? " active" : ""
        }`}
        onClick={() => onTabChange(tab.key)}
        aria-label={tab.label}
      >
        <span className="icon">{tab.icon}</span>
        <span className="label">{tab.label}</span>
      </button>
    ))}
  </div>
);

export default SupportTabBar;
