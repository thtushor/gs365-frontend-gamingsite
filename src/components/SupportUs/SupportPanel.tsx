import React from "react";
import "./SupportPanel.scss";
import SupportTabBar from "./SupportTabBar";
import SupportHomeTab from "./SupportHomeTab";
import SupportMessage from "./SupportMessagesTab"; // Renamed import
import SupportHelpTab from "./SupportHelpTab";

// import useSupportPanel from "./useSupportPanel";
import { SupportPanelProvider, useSupportPanelContext } from "../../contexts/SupportPanelContext";
import { ChatProvider } from "../../contexts/ChatContext";

interface SupportPanelProps {
  open: boolean;
  onOpen:()=>void;
  onClose: () => void;
}

const SupportPanelContent: React.FC<{ onClose: () => void,open:boolean,onOpen: ()=>void }> = ({ onClose }) => {
  const { activeTab, handleTabChange, parenScroll } =
    useSupportPanelContext();


  return (
    <div className="support-panel-overlay" onClick={onClose}>
      <div className="support-panel-modal" onClick={(e) => e.stopPropagation()}>
        <div
          className={`support-panel-content ${parenScroll ? "overflow-y-auto" : ""
            } ${activeTab === "messages" ? "!mb-0" : ""}`}
        >
          {activeTab === "home" && <SupportHomeTab  onClose={onClose} />}
          {activeTab === "messages" && (
            <SupportMessage onClose={onClose}/>
          )}
          {activeTab === "help" && <SupportHelpTab onClose={onClose} />}
        </div>
        {parenScroll && activeTab !== "messages" && (
          <SupportTabBar activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
};

const SupportPanel: React.FC<SupportPanelProps> = ({ open,onOpen, onClose }) => {
  // if (!open) return null;

  return (
    <SupportPanelProvider>
      <ChatProvider onOpen={onOpen}>
       {open &&  <SupportPanelContent onClose={onClose} onOpen={onOpen} open={open} />}
      </ChatProvider>
    </SupportPanelProvider>
  );
};

export default SupportPanel;
