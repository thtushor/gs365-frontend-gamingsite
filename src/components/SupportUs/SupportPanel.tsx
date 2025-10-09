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
  onOpen: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

const SupportPanelContent: React.FC<{ onClose: () => void, open: boolean, onOpen: () => void }> = ({ onClose }) => {
  const { activeTab, handleTabChange, parenScroll } =
    useSupportPanelContext();


  return (
    <div className="support-panel-overlay" onClick={onClose}>
      <div className="support-panel-modal" onClick={(e) => e.stopPropagation()}>
        <div
          className={`support-panel-content ${parenScroll ? "overflow-y-auto" : ""
            } ${activeTab === "messages" ? "!mb-0" : ""}`}
        >
          {activeTab === "home" && <SupportHomeTab onClose={onClose} />}
          {activeTab === "messages" && (
            <SupportMessage onClose={onClose} />
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


const SupportPanelProviderMiddleWare: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SupportPanelProvider>
    {children}
  </SupportPanelProvider>

}

const SupportPanelInner: React.FC<SupportPanelProps> = ({ open, onOpen, onClose }) => {
  const data = useSupportPanelContext(); // ✅ now inside provider
  console.log({ contextData: data });

  return (
    <ChatProvider onOpen={onOpen} activeTab={data?.activeTab}>
      {open && <SupportPanelContent onClose={onClose} onOpen={onOpen} open={open} />}
    </ChatProvider>
  );
};

const SupportPanel: React.FC<SupportPanelProps> = ({ open, onOpen, onClose }) => {

  return (
    <SupportPanelProviderMiddleWare>
   <SupportPanelInner onClose={onClose} open={open} onOpen={onOpen}/>
    </SupportPanelProviderMiddleWare>
  );
};

export default SupportPanel;
