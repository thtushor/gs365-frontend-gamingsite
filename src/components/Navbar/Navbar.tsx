import React, { useEffect, useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Logo } from "../Logo/Logo";
import "./Navbar.scss";
import { CurrencyModal } from "../Modal/CurrencyModal";
import { NavLink, useNavigate } from "react-router-dom";
import { WalletIcon } from "../Icon/WalletIcon";
import { EyeHideIcon } from "../Icon/EyeHideIcon";
import { EyeShowIcon } from "../Icon/EyeShowIcon";
import { MobileDrawer } from "./MobileDrawer";

export const Navbar: React.FC = () => {
  const [data, setCurrency] = useState({
    currency: "USD",
    language: "en",
  });

  const [, setCurrentTime] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCurrencySelect = (value: {
    currency: string;
    language: string;
  }) => {
    setCurrency(value);
  };

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showBalance, setShowBalance] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
  };

  const navigate = useNavigate();

  const handleDepositClick = () => {
    navigate("/deposit");
  };

  return (
    <div>
      <MobileDrawer open={isMenuOpen} onClose={toggleMenu} />
      <nav className="main-navbar">
        <div className="navbar-container">
          <div className="navbar-left ">
            <NavLink to="/" className={"hidden md:block"}>
              <div className="brand">
                <Logo />
              </div>
            </NavLink>
            <button className="mobile-menu-button" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="top-navbar__left mobile-only">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>

          <div className="main-menu-wrapper hidden md:block">
            <div className="main-menu">
              <NavLink to="/sports" className="menu-item sports">
                Sports
              </NavLink>
              <NavLink to="/crash" className="menu-item crash">
                Crash
              </NavLink>
              <NavLink to="/slots" className="menu-item slots">
                Slots
              </NavLink>
              <NavLink to="/arcade" className="menu-item arcade">
                Arcade
              </NavLink>
              <NavLink to="/casino" className="menu-item casino">
                Casino
              </NavLink>
              <NavLink to="/lottery" className="menu-item lottery">
                Lottery
              </NavLink>
              <NavLink to="/fishing" className="menu-item fishing">
                Fishing
              </NavLink>
              <NavLink to="/promotion" className="menu-item promotion">
                Promotion
              </NavLink>
              <NavLink to="/table" className="menu-item table">
                Table
              </NavLink>
            </div>

            <div className="mobile-actions hidden">
              {/* This is now hidden, handled by MobileDrawer */}
            </div>
          </div>

          <div className="navbar-right desktop-only">
            <div className="user-balance">
              <div className="balance-item">
                <WalletIcon />
                {showBalance ? <span>৳1000</span> : null}

                <span
                  onClick={() => setShowBalance(!showBalance)}
                  style={{
                    color: "white !important",
                  }}
                >
                  {showBalance ? <EyeHideIcon /> : <EyeShowIcon />}
                </span>
              </div>
            </div>

            <div className="user-actions">
              <button className="btn-deposit" onClick={handleDepositClick}>
                Deposit
              </button>
              <button className="btn-register">Sign Up</button>
              <button className="btn-login">
                <FaUser />
                LOG IN
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleCurrencySelect}
        value={data}
      />
    </div>
  );
};
