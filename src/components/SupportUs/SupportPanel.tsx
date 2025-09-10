import React, { useState } from "react";
import "./SupportPanel.scss";
import SupportTabBar from "./SupportTabBar";
import SupportHomeTab from "./SupportHomeTab";
import SupportMessagesTab from "./SupportMessagesTab";
import SupportHelpTab from "./SupportHelpTab";
import { XIcon } from "lucide-react";

interface SupportPanelProps {
  open: boolean;
  onClose: () => void;
}

const SupportPanel: React.FC<SupportPanelProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [parenScroll, setParentScroll] = useState(true);
  if (!open) return null;
  return (
    <div className="support-panel-overlay" onClick={onClose}>
      <div className="support-panel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end ">
          <button
            className="text-[10px] bg-transparent focus:outline-0 focus-visible:outline-0"
            onClick={onClose}
          >
            <XIcon className="text-[10px]" />
          </button>
        </div>
        <div
          className={`support-panel-content ${
            parenScroll ? "overflow-y-auto" : ""
          }`}
        >
          {activeTab === "home" && <SupportHomeTab />}
          {activeTab === "messages" && (
            <SupportMessagesTab setParentScroll={setParentScroll} />
          )}
          {activeTab === "help" && <SupportHelpTab />}
        </div>
        {parenScroll && (
          <SupportTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </div>
  );
};

export default SupportPanel;
