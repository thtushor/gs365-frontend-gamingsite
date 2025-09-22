import React from "react";
import "./SupportPanel.scss";
import SupportTabBar from "./SupportTabBar";
import SupportHomeTab from "./SupportHomeTab";
import SupportMessagesTab from "./SupportMessagesTab";
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
        <div className="flex justify-end ">
          {/* <button
            className="text-[10px] bg-transparent focus:outline-0 focus-visible:outline-0"
            onClick={onClose}
          >
            <XIcon className="text-[10px]" />
          </button> */}
        </div>
        <div
          className={`support-panel-content ${parenScroll ? "overflow-y-auto" : ""
            } ${activeTab === "messages" ? "!mb-0" : ""}`}
        >
          {activeTab === "home" && <SupportHomeTab />}
          {activeTab === "messages" && <SupportMessagesTab />}
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
