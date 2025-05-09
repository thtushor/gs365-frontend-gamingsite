import React from "react";
import "./Navbar.scss";
import {
  FaHome,
  FaMobileAlt,
  FaFutbol,
  FaDice,
  FaTableTennis,
  FaFish,
  FaChess,
  FaGamepad,
  FaTicketAlt,
  FaGift,
  FaCrown,
} from "react-icons/fa";

const menuItems = [
  { label: "হোম", icon: <FaHome /> },
  { label: "মোবাইল", icon: <FaMobileAlt /> },
  {
    label: "স্পোর্ট",
    icon: <FaFutbol />,
    active: true,
    submenu: ["I-Sports", "BTi Sports", "Exchange", "SBO Sports"],
  },
  { label: "ক্যাসিনো", icon: <FaDice /> },
  { label: "টেবিল", icon: <FaTableTennis /> },
  { label: "ফিশিং", icon: <FaFish /> },
  { label: "ক্রাশ", icon: <FaChess /> },
  { label: "আর্কেড", icon: <FaGamepad /> },
  { label: "লটারি", icon: <FaTicketAlt /> },
  { label: "প্রমোশনাল অফার", icon: <FaGift /> },
  { label: "ভিআইপি", icon: <FaCrown /> },
  { label: "রেফারেল" },
];

const Navbar: React.FC = () => (
  <nav className="gs365-navbar">
    <ul className="navbar-menu">
      {menuItems.map((item) => (
        <li key={item.label} className={item.active ? "active" : ""}>
          <span className="menu-icon">{item.icon}</span>
          <span className="menu-label">{item.label}</span>
          {item.submenu && (
            <ul className="submenu">
              {item.submenu.map((sub, subIdx) => (
                <li key={subIdx}>{sub}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
