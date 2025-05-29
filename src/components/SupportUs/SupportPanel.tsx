import React, { useState } from "react";
import "./SupportPanel.scss";
import SupportTabBar from "./SupportTabBar";
import SupportHomeTab from "./SupportHomeTab";
import SupportMessagesTab from "./SupportMessagesTab";
import SupportHelpTab from "./SupportHelpTab";

interface SupportPanelProps {
  open: boolean;
  onClose: () => void;
}

const SupportPanel: React.FC<SupportPanelProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("home");
  if (!open) return null;
  return (
    <div className="support-panel-overlay" onClick={onClose}>
      <div className="support-panel-modal" onClick={(e) => e.stopPropagation()}>
        <button className="support-panel-close" onClick={onClose}>
          &times;
        </button>
        <div className="support-panel-content">
          {activeTab === "home" && <SupportHomeTab />}
          {activeTab === "messages" && <SupportMessagesTab />}
          {activeTab === "help" && <SupportHelpTab />}
        </div>
        <SupportTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default SupportPanel;
