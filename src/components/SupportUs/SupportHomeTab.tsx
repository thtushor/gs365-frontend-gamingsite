import React from "react";
import "./SupportHomeTab.scss";

const SupportHomeTab: React.FC = () => (
  <div className="support-home-tab">
    <div className="support-home-header">
      <div className="logo">baji</div>
      <div className="avatar-group">
        <div className="avatar" />
        <div className="avatar" />
        <div className="avatar" />
      </div>
    </div>
    <h2>
      Hi Dear,
      <br />
      How may I assist you?
    </h2>
    <div className="recent-message">
      <div className="sender">Recent message</div>
      <div className="message-content">
        <div className="text">
          প্রিয় গ্রাহক , কিভাবে আপনাকে সহায়তা করতে পারি...
        </div>
        <div className="meta">Baji Customer Service • 1h ago</div>
      </div>
    </div>
    <button className="send-message-btn">Send us a message</button>
    <div className="promo-cards">
      <div className="promo-card">বিকল্প সাইট 1</div>
      <div className="promo-card">বিকল্প সাইট 2</div>
    </div>
    <div className="promo-banner">আইপিএল ২০২৫ অফার</div>
  </div>
);

export default SupportHomeTab;
