import React, { useState } from "react";
import "./SupportPanel.scss";
import SupportTabBar from "./SupportTabBar";
import SupportHomeTab from "./SupportHomeTab";
import SupportMessage from "./SupportMessagesTab"; // Renamed import
import SupportHelpTab from "./SupportHelpTab";
import { XIcon } from "lucide-react";
import useSupportPanel from "./useSupportPanel";
import { SupportPanelProvider, useSupportPanelContext } from "../../contexts/SupportPanelContext";
import { ChatProvider } from "../../contexts/ChatContext";

interface SupportPanelProps {
  open: boolean;
  onClose: () => void;
}

const SupportPanelContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { activeTab, handleTabChange, parenScroll } =
    useSupportPanelContext();

  return (
    <div className="support-panel-overlay" onClick={onClose}>
      <div className="support-panel-modal" onClick={(e) => e.stopPropagation()}>
        <div
          className={`support-panel-content ${parenScroll ? "overflow-y-auto" : ""
            } ${activeTab === "messages" ? "!mb-0" : ""}`}
        >
          {activeTab === "home" && <SupportHomeTab />}
          {activeTab === "messages" && (
            <SupportMessage
              isAffiliate={false} // Placeholder, adjust as needed
            />
          )}
          {activeTab === "help" && <SupportHelpTab />}
        </div>
        {parenScroll && activeTab !== "messages" && (
          <SupportTabBar activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
};

const SupportPanel: React.FC<SupportPanelProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <SupportPanelProvider>
      <ChatProvider>
        <SupportPanelContent onClose={onClose} />
      </ChatProvider>
    </SupportPanelProvider>
  );
};

export default SupportPanel;
