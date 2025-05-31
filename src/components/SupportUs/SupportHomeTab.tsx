import React from "react";
import {
  FiArrowRight,
  FiExternalLink,
  FiGift,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import "./SupportHomeTab.scss";

const SupportHomeTab: React.FC = () => (
  <div className="support-home-tab">
    <div className="support-home-header">
      <div className="logo">baji</div>
      <div className="avatar-group">
        <img
          className="avatar"
          src="https://static.intercomassets.com/avatars/7986453/square_128/Screenshot_2025-01-07_164341-1736248445.png"
          alt="avatar1"
        />
        <img
          className="avatar"
          src="https://static.intercomassets.com/avatars/6524296/square_128/Lionel-Messi-2018-4K-Ultra-HD-Mobile-Wallpaper-950x1689-1702204890.jpg"
          alt="avatar2"
        />
        <img
          className="avatar"
          src="https://static.intercomassets.com/avatars/6483804/square_128/pexels-dreamlensproduction-2913125-1727340458.jpg"
          alt="avatar3"
        />
      </div>
    </div>
    <div className="support-home-greeting">
      <h2>
        Hi Dear,
        <br />
        How may I assist you?
      </h2>
    </div>
    <div className="support-home-card recent-message-card">
      <div className="recent-message-header">Recent message</div>
      <div className="recent-message-body">
        <img
          className="avatar"
          src="https://static.intercomassets.com/avatars/6483804/square_128/pexels-dreamlensproduction-2913125-1727340458.jpg"
          alt="avatar"
        />
        <div className="recent-message-info">
          <div className="recent-message-title">বাংলা</div>
          <div className="recent-message-meta">
            Baji Customer Service • 1d ago
          </div>
        </div>
      </div>
    </div>
    <div className="support-home-card send-message-card">
      <span>Send us a message</span>
      <FiArrowRight className="arrow-icon" />
    </div>

    <div className="promo-section">
      <h3 className="section-title">Special Offers</h3>
      <div className="support-home-card promo-card">
        <div className="promo-icon">
          <FiGift />
        </div>
        <div className="promo-content">
          <h4>T20 ব্লাস্ট ওয়েলকাম অফার</h4>
          <p>৳১০,০০০ প্রথম সপ্তাহের রিফান্ড বোনাস</p>
          <span className="promo-tag">Limited Time</span>
        </div>
      </div>

      <div className="support-home-card promo-card">
        <div className="promo-icon">
          <FiStar />
        </div>
        <div className="promo-content">
          <h4>ভিআইপি ইনস্ট্যান্ট রিবেট</h4>
          <p>প্রতিটি ভিআইপি পয়েন্ট দিয়ে আরও বেশি উপার্জন করুন</p>
          <span className="promo-tag">VIP Only</span>
        </div>
      </div>

      <div className="support-home-card promo-card">
        <div className="promo-icon">
          <FiUsers />
        </div>
        <div className="promo-content">
          <h4>রেফার এ ফ্রেন্ড</h4>
          <p>৳৩০০ বোনাস + আনলিমিটেড কমিশন</p>
          <span className="promo-tag">New</span>
        </div>
      </div>
    </div>

    <div className="support-home-card promo-banner-card">
      <img
        src="https://img.b112j.com/upload/announcement/image_230631.jpg"
        alt="Promo Banner"
      />
      <div className="banner-overlay">
        <h3>T20 ব্লাস্ট ওয়েলকাম অফার</h3>
        <p>ডিপোজিট করুন, বেট রাখুন, & আধিপত্য বিস্তার করুন!</p>
      </div>
    </div>

    <div className="support-home-card promo-link-card">
      <span>বিকল্প সাইট 1</span>
      <FiExternalLink className="external-link-icon" />
    </div>
    <div className="support-home-card promo-link-card">
      <span>বিকল্প সাইট 2</span>
      <FiExternalLink className="external-link-icon" />
    </div>
  </div>
);

export default SupportHomeTab;
