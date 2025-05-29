import React from "react";
import "./SupportMessagesTab.scss";

const SupportMessagesTab: React.FC = () => (
  <div className="support-messages-tab">
    <h2>Messages</h2>
    <div className="message-list">
      <div className="message-item">
        <div className="avatar" />
        <div className="message-info">
          <div className="text">
            প্রিয় গ্রাহক , কিভাবে আপনাকে সহায়তা করতে পারি...
          </div>
          <div className="meta">Baji Customer Service • 1h ago</div>
        </div>
      </div>
    </div>
    <button className="send-message-btn">Send us a message</button>
  </div>
);

export default SupportMessagesTab;
