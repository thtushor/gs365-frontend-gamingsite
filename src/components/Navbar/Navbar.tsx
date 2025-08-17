import React, { useEffect, useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Logo } from "../Logo/Logo";
import "./Navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { WalletIcon } from "../Icon/WalletIcon";
import { EyeHideIcon } from "../Icon/EyeHideIcon";
import { EyeShowIcon } from "../Icon/EyeShowIcon";
import { MobileDrawer } from "./MobileDrawer";
import { CurrencyModal } from "../Modal/CurrencyModal";

const subnavSlides = [
  {
    img: "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_03.png",
    alt: "I-Sports",
  },
  {
    img: "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_02.png",
    alt: "I-Sports 2",
  },
];

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

  // Subnav slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = subnavSlides.length;

  const goToPrev = () =>
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slideCount);

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

      {/* Subnav Slider */}
      <div className="w-full bg-[#232323] flex items-center justify-center py-4 relative overflow-hidden">
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-green-600 transition text-yellow-400 text-2xl shadow-lg"
          aria-label="Previous"
        >
          &#60;
        </button>
        <div className="w-[320px] md:w-[480px] h-[180px] flex items-center justify-center relative">
          {subnavSlides.map((slide, idx) => (
            <img
              key={slide.img}
              src={slide.img}
              alt={slide.alt}
              className={`absolute top-0 left-0 w-full h-full object-contain rounded-xl shadow-xl transition-all duration-700
                ${
                  idx === currentSlide
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-90 z-0"
                }
              `}
              style={{
                filter:
                  idx === currentSlide
                    ? "drop-shadow(0 0 24px #ffe066)"
                    : "none",
              }}
            />
          ))}
        </div>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-green-600 transition text-yellow-400 text-2xl shadow-lg"
          aria-label="Next"
        >
          &#62;
        </button>
      </div>

      <CurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleCurrencySelect}
        value={data}
      />
    </div>
  );
};
