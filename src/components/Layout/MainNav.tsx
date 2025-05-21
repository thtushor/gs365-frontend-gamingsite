import React, { useState, useEffect } from "react";
import "./MainNav.scss";
import {
  FaHome,
  FaMobileAlt,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import { BsFillTrophyFill } from "react-icons/bs";
import { GiPokerHand } from "react-icons/gi";
import { MdSportsSoccer, MdCasino, MdLiveTv } from "react-icons/md";
import { RiVipDiamondFill, RiGamepadFill } from "react-icons/ri";

interface SubNavItem {
  name: string;
  image1: string;
  image2: string;
  image3: string;
}

const sports: SubNavItem[] = [
  {
    name: "ক্রিকেট",
    image1: "/assets/sports/cricket1.png",
    image2: "/assets/sports/cricket2.png",
    image3: "/assets/sports/cricket3.png",
  },
  {
    name: "ফুটবল",
    image1: "/assets/sports/football1.png",
    image2: "/assets/sports/football2.png",
    image3: "/assets/sports/football3.png",
  },
  {
    name: "টেনিস",
    image1: "/assets/sports/tennis1.png",
    image2: "/assets/sports/tennis2.png",
    image3: "/assets/sports/tennis3.png",
  },
  {
    name: "বাস্কেটবল",
    image1: "/assets/sports/basketball1.png",
    image2: "/assets/sports/basketball2.png",
    image3: "/assets/sports/basketball3.png",
  },
  {
    name: "ভলিবল",
    image1: "/assets/sports/volleyball1.png",
    image2: "/assets/sports/volleyball2.png",
    image3: "/assets/sports/volleyball3.png",
  },
  {
    name: "টেবল টেনিস",
    image1: "/assets/sports/tabletennis1.png",
    image2: "/assets/sports/tabletennis2.png",
    image3: "/assets/sports/tabletennis3.png",
  },
  {
    name: "বোলিং",
    image1: "/assets/sports/bowling1.png",
    image2: "/assets/sports/bowling2.png",
    image3: "/assets/sports/bowling3.png",
  },
  {
    name: "বেসবল",
    image1: "/assets/sports/baseball1.png",
    image2: "/assets/sports/baseball2.png",
    image3: "/assets/sports/baseball3.png",
  },
];

const MainNav: React.FC = () => {
  const [openSubNav, setOpenSubNav] = useState<number | null>(null);
  const [subNavIndex, setSubNavIndex] = useState(0);
  const [transformStyles, setTransformStyles] = useState<{
    [key: string]: React.CSSProperties;
  }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".nav-item")) {
        setOpenSubNav(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    itemIndex: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    // Calculate the center of the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate the rotation based on mouse position relative to center
    // Divide by 25 to reduce the rotation amount for subtle effect
    const rotateX = -((y - centerY) / 25);
    const rotateY = (x - centerX) / 25;

    // Create a unique identifier for this item
    const itemKey = `item-${itemIndex}`;

    // Update styles for this specific item
    setTransformStyles((prev) => ({
      ...prev,
      [itemKey]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
        transition: "transform 0.1s ease",
      },
      [`${itemKey}-img1`]: {
        transform: `translateZ(20px) rotateX(${rotateX * 0.2}deg) rotateY(${
          rotateY * 0.2
        }deg)`,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.5)",
      },
      [`${itemKey}-img2`]: {
        transform: `translateZ(10px) translateX(${
          rotateY * 0.7
        }px) translateY(${rotateX * -0.7}px) rotateX(${
          rotateX * 0.1
        }deg) rotateY(${rotateY * 0.1}deg)`,
        boxShadow: "0 15px 25px rgba(0, 0, 0, 0.4)",
      },
      [`${itemKey}-img3`]: {
        transform: `translateZ(0px) translateX(${rotateY * 1.2}px) translateY(${
          rotateX * -1.2
        }px)`,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
      },
    }));
  };

  const handleMouseLeave = (itemIndex: number) => {
    const itemKey = `item-${itemIndex}`;

    // Reset transformations with a longer transition for a smooth return
    setTransformStyles((prev) => ({
      ...prev,
      [itemKey]: {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.5s ease",
      },
      [`${itemKey}-img1`]: {
        transform: "translateZ(0)",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        transition: "all 0.5s ease",
      },
      [`${itemKey}-img2`]: {
        transform: "translateZ(0)",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        transition: "all 0.5s ease",
      },
      [`${itemKey}-img3`]: {
        transform: "translateZ(0)",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        transition: "all 0.5s ease",
      },
    }));
  };

  const handleNavToggle = (index: number | null) => {
    if (openSubNav === index) {
      setOpenSubNav(null);
    } else {
      setOpenSubNav(index);
    }
  };

  const displayItems = () => {
    const startIdx = subNavIndex;
    const endIdx = Math.min(startIdx + 4, sports.length);
    return sports.slice(startIdx, endIdx);
  };

  return (
    <div className="main-nav">
      <ul className="nav-inner">
        <li className="nav-item active">
          <a href="/">
            <FaHome className="nav-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a href="/page/guest/appDownload.jsp" target="_blank">
            <FaMobileAlt className="nav-icon" />
          </a>
        </li>
        <li className={`nav-item ${openSubNav === 0 ? "active" : ""}`}>
          <a
            href="/sports"
            onClick={(e) => {
              e.preventDefault();
              handleNavToggle(0);
            }}
          >
            <MdSportsSoccer className="nav-icon" />
            স্পোর্ট
            <FaChevronDown className="nav-dropdown-icon" />
          </a>
          {openSubNav === 0 && (
            <div className="sub-nav-slide">
              <div className="sub-nav-inner">
                <button
                  className="arrow-prev"
                  onClick={() => setSubNavIndex(Math.max(0, subNavIndex - 1))}
                  disabled={subNavIndex === 0}
                >
                  <FaChevronLeft />
                </button>
                <div className="sub-nav-draggable">
                  <div
                    className="sub-nav-track"
                    style={{
                      transform: `translateX(0px)`,
                    }}
                  >
                    {displayItems().map((sport, idx) => (
                      <div className="sub-nav-item" key={idx}>
                        <span>{sport.name}</span>
                        <a href={`/${sport.name}`}>
                          <div
                            className="item-box"
                            style={transformStyles[`item-${idx}`]}
                            onMouseMove={(e) => handleMouseMove(e, idx)}
                            onMouseLeave={() => handleMouseLeave(idx)}
                          >
                            <img
                              className="item-1st"
                              src={sport.image1}
                              alt={sport.name}
                              style={transformStyles[`item-${idx}-img1`]}
                            />
                            <img
                              className="item-2nd"
                              src={sport.image2}
                              alt={sport.name}
                              style={transformStyles[`item-${idx}-img2`]}
                            />
                            <img
                              className="item-3rd"
                              src={sport.image3}
                              alt={sport.name}
                              style={transformStyles[`item-${idx}-img3`]}
                            />
                          </div>
                          <p>{sport.name}</p>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="arrow-next"
                  onClick={() =>
                    setSubNavIndex(Math.min(sports.length - 4, subNavIndex + 1))
                  }
                  disabled={subNavIndex >= sports.length - 4}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </li>
        <li className="nav-item">
          <a href="/live-casino">
            <MdCasino className="nav-icon" />
            লাইভ ক্যাসিনো
          </a>
        </li>
        <li className="nav-item">
          <a href="/casino">
            <MdCasino className="nav-icon" />
            ক্যাসিনো
          </a>
        </li>
        <li className="nav-item">
          <a href="/slots">
            <RiGamepadFill className="nav-icon" />
            স্লট
          </a>
        </li>
        <li className="nav-item">
          <a href="/games">
            <RiGamepadFill className="nav-icon" />
            গেমস
          </a>
        </li>
        <li className="nav-item">
          <a href="/poker">
            <GiPokerHand className="nav-icon" />
            পোকার
          </a>
        </li>
        <li className="nav-item">
          <a href="/lottery">
            <BsFillTrophyFill className="nav-icon" />
            লটারি
          </a>
        </li>
        <li className="nav-item">
          <a href="/vip">
            <RiVipDiamondFill className="nav-icon" />
            VIP
          </a>
        </li>
        <li className="nav-item">
          <a href="/promotions">
            <MdLiveTv className="nav-icon" />
            প্রমোশন
          </a>
        </li>
        <li className="nav-item">
          <a href="/referral/">রেফারেল</a>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
