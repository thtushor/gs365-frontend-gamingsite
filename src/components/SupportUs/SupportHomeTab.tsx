import React from "react";
import {
  FiArrowRight,
  FiExternalLink,
  FiGift,
  FiStar,
  FiUsers,
  FiAward,
  FiDollarSign,
  FiPercent,
  FiTrendingUp,
  FiClock,
  FiHeart,
  FiShield,
  FiZap,
  FiTarget,
  FiAperture,
  FiCoffee,
  FiDroplet,
  FiSun,
  FiMoon,
  FiWind,
  FiFrown,
  FiAward as FiTrophy,
  FiCreditCard,
  FiSmartphone,
  FiHeadphones,
  FiBook,
  FiGlobe,
  FiLock,
  FiRefreshCw,
  FiCalendar,
  FiClock as FiTime,
  FiGift as FiBonus,
  FiTrendingUp as FiTrend,
  FiUsers as FiTeam,
  FiAward as FiMedal,
} from "react-icons/fi";
import "./SupportHomeTab.scss";

const SupportHomeTab: React.FC = () => (
  <div className="support-home-tab">
    <div className="support-home-header">
      <div className="logo">GS365</div>
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
        Welcome to GamingStar,
        <br />
        How can we help you today?
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
          <div className="recent-message-title">Gaming Support</div>
          <div className="recent-message-meta">GamingStar Support • 1d ago</div>
        </div>
      </div>
    </div>
    <div className="support-home-card send-message-card">
      <span>Send us a message</span>
      <FiArrowRight className="arrow-icon" />
    </div>

    <div className="promo-banners">
      <div className="support-home-card promo-banner-card">
        <div className="banner-image">
          <img
            src="https://img.b112j.com/upload/announcement/image_230631.jpg"
            alt="Welcome Banner"
          />
        </div>
        <div className="banner-overlay">
          <div>
            <h3>Welcome to GamingStar</h3>
            <p>
              Start your gaming journey with our exclusive welcome bonus. Get
              ready for an amazing experience with premium features and exciting
              rewards!
            </p>
          </div>
          <button className="banner-cta">Get Started</button>
        </div>
      </div>

      <div className="support-home-card promo-banner-card">
        <div className="banner-image">
          <img
            src="https://img.b112j.com/upload/announcement/image_230632.jpg"
            alt="VIP Banner"
          />
        </div>
        <div className="banner-overlay">
          <div>
            <h3>Join VIP Club</h3>
            <p>
              Experience luxury gaming with exclusive VIP benefits, personalized
              support, and special rewards. Elevate your gaming experience
              today!
            </p>
          </div>
          <button className="banner-cta">Join Now</button>
        </div>
      </div>

      <div className="support-home-card promo-banner-card">
        <div className="banner-image">
          <img
            src="https://img.b112j.com/upload/announcement/image_230633.jpg"
            alt="Tournament Banner"
          />
        </div>
        <div className="banner-overlay">
          <div>
            <h3>Weekly Tournaments</h3>
            <p>
              Compete with the best players and win amazing prizes. Join our
              weekly tournaments and showcase your skills!
            </p>
          </div>
          <button className="banner-cta">View Tournaments</button>
        </div>
      </div>

      <div className="support-home-card promo-banner-card">
        <div className="banner-image">
          <img
            src="https://img.b112j.com/upload/announcement/image_230634.jpg"
            alt="Live Streaming Banner"
          />
        </div>
        <div className="banner-overlay">
          <div>
            <h3>Live Streaming</h3>
            <p>
              Watch all matches live in HD quality. Never miss a moment of the
              action with our premium streaming service!
            </p>
          </div>
          <button className="banner-cta">Watch Now</button>
        </div>
      </div>
    </div>

    <div className="promo-section">
      <h3 className="section-title">Gaming Offers</h3>
      <div className="promo-grid">
        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiGift />
          </div>
          <div className="promo-content">
            <h4>Welcome Bonus</h4>
            <p>Get ৳10,000 on your first deposit</p>
            <span className="promo-tag">Limited Time</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiStar />
          </div>
          <div className="promo-content">
            <h4>VIP Program</h4>
            <p>Exclusive rewards for VIP members</p>
            <span className="promo-tag">VIP Only</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiUsers />
          </div>
          <div className="promo-content">
            <h4>Refer & Earn</h4>
            <p>৳300 bonus + unlimited commission</p>
            <span className="promo-tag">New</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiAward />
          </div>
          <div className="promo-content">
            <h4>Champion Bonus</h4>
            <p>৳500 bonus for each match win</p>
            <span className="promo-tag">Hot</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiDollarSign />
          </div>
          <div className="promo-content">
            <h4>Cashback Offer</h4>
            <p>10% cashback on every bet</p>
            <span className="promo-tag">Popular</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiPercent />
          </div>
          <div className="promo-content">
            <h4>Mega Weekend</h4>
            <p>50% weekly bonus</p>
            <span className="promo-tag">Weekend</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiTrendingUp />
          </div>
          <div className="promo-content">
            <h4>Live Streaming</h4>
            <p>Watch all matches live</p>
            <span className="promo-tag">Live</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiClock />
          </div>
          <div className="promo-content">
            <h4>24/7 Support</h4>
            <p>Always here to help</p>
            <span className="promo-tag">Support</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiHeart />
          </div>
          <div className="promo-content">
            <h4>Loyalty Program</h4>
            <p>Special benefits for loyal players</p>
            <span className="promo-tag">Loyal</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiShield />
          </div>
          <div className="promo-content">
            <h4>Secure Payment</h4>
            <p>100% secure transactions</p>
            <span className="promo-tag">Secure</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiZap />
          </div>
          <div className="promo-content">
            <h4>Fast Withdraw</h4>
            <p>Instant money withdrawal</p>
            <span className="promo-tag">Fast</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiTarget />
          </div>
          <div className="promo-content">
            <h4>Target Bonus</h4>
            <p>Bonus for reaching targets</p>
            <span className="promo-tag">Target</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiAperture />
          </div>
          <div className="promo-content">
            <h4>Multi-Game Bonus</h4>
            <p>Special offers on all games</p>
            <span className="promo-tag">Multi</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiCoffee />
          </div>
          <div className="promo-content">
            <h4>Morning Special</h4>
            <p>20% bonus on morning bets</p>
            <span className="promo-tag">Morning</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiDroplet />
          </div>
          <div className="promo-content">
            <h4>Refresh Bonus</h4>
            <p>৳100 daily refresh bonus</p>
            <span className="promo-tag">Daily</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiSun />
          </div>
          <div className="promo-content">
            <h4>Sunrise Offer</h4>
            <p>30% bonus 6-9 AM</p>
            <span className="promo-tag">Sunrise</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiMoon />
          </div>
          <div className="promo-content">
            <h4>Night Special</h4>
            <p>25% bonus on night bets</p>
            <span className="promo-tag">Night</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiWind />
          </div>
          <div className="promo-content">
            <h4>Quick Win</h4>
            <p>৳200 bonus for quick wins</p>
            <span className="promo-tag">Quick</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiFrown />
          </div>
          <div className="promo-content">
            <h4>Royal Bonus</h4>
            <p>৳1000 for royal flush</p>
            <span className="promo-tag">Royal</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiTrophy />
          </div>
          <div className="promo-content">
            <h4>Tournament Prize</h4>
            <p>৳50,000 tournament prize pool</p>
            <span className="promo-tag">Tournament</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiCreditCard />
          </div>
          <div className="promo-content">
            <h4>Card Bonus</h4>
            <p>5% extra on card deposits</p>
            <span className="promo-tag">Card</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiSmartphone />
          </div>
          <div className="promo-content">
            <h4>Mobile Bonus</h4>
            <p>৳50 bonus on mobile app</p>
            <span className="promo-tag">Mobile</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiHeadphones />
          </div>
          <div className="promo-content">
            <h4>Live Support</h4>
            <p>24/7 live chat support</p>
            <span className="promo-tag">Support</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiBook />
          </div>
          <div className="promo-content">
            <h4>Guide Bonus</h4>
            <p>৳100 for reading guides</p>
            <span className="promo-tag">Learn</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiGlobe />
          </div>
          <div className="promo-content">
            <h4>Global Tournaments</h4>
            <p>Compete with players worldwide</p>
            <span className="promo-tag">Global</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiLock />
          </div>
          <div className="promo-content">
            <h4>Security Bonus</h4>
            <p>৳200 for enabling 2FA</p>
            <span className="promo-tag">Secure</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiRefreshCw />
          </div>
          <div className="promo-content">
            <h4>Auto Refresh</h4>
            <p>Daily auto-refresh bonus</p>
            <span className="promo-tag">Auto</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiCalendar />
          </div>
          <div className="promo-content">
            <h4>Monthly Bonus</h4>
            <p>৳500 monthly loyalty bonus</p>
            <span className="promo-tag">Monthly</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiTime />
          </div>
          <div className="promo-content">
            <h4>Time Bonus</h4>
            <p>Extra bonus for playing longer</p>
            <span className="promo-tag">Time</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiBonus />
          </div>
          <div className="promo-content">
            <h4>Birthday Bonus</h4>
            <p>৳1000 on your birthday</p>
            <span className="promo-tag">Birthday</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiTrend />
          </div>
          <div className="promo-content">
            <h4>Trending Bonus</h4>
            <p>Extra bonus on trending games</p>
            <span className="promo-tag">Trend</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiTeam />
          </div>
          <div className="promo-content">
            <h4>Team Bonus</h4>
            <p>৳2000 for team tournaments</p>
            <span className="promo-tag">Team</span>
          </div>
        </div>

        <div className="support-home-card promo-card">
          <div className="promo-icon">
            <FiMedal />
          </div>
          <div className="promo-content">
            <h4>Achievement Bonus</h4>
            <p>৳300 for completing achievements</p>
            <span className="promo-tag">Achieve</span>
          </div>
        </div>
      </div>
    </div>

    <div className="support-home-card promo-link-card">
      <span>Alternative Site 1</span>
      <FiExternalLink className="external-link-icon" />
    </div>
    <div className="support-home-card promo-link-card">
      <span>Alternative Site 2</span>
      <FiExternalLink className="external-link-icon" />
    </div>
  </div>
);

export default SupportHomeTab;
