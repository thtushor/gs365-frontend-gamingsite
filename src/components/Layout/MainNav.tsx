/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "./MainNav.scss";
import { FaHome, FaMobileAlt, FaChevronDown } from "react-icons/fa";
import { BsFillTrophyFill } from "react-icons/bs";
import { GiPokerHand } from "react-icons/gi";
import { MdSportsSoccer, MdCasino, MdLiveTv } from "react-icons/md";
import { RiVipDiamondFill, RiGamepadFill } from "react-icons/ri";
import bgGalaxy from "../../assets/sports/galaxy.png";
import GalaxyStars from "./GalaxyStars";

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

const subnavOptions = [
  {
    title: "I-Sports",
    images: [
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_02.png",
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_03.png",
    ],
    button: "এখনি খেলুন",
  },
  {
    title: "BTi Sports",
    images: [
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_03.png",
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_02.png",
    ],
    button: "এখনি খেলুন",
  },
  {
    title: "Exchange",
    images: [
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_03.png",
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_02.png",
    ],
    button: "এখনি খেলুন",
  },
  {
    title: "SBO Sports",
    images: [
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_03.png",
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_02.png",
    ],
    button: "এখনি খেলুন",
  },
  // Add more as needed
];

const SubnavCard: React.FC<{
  title: string;
  images: string[];
  button: string;
}> = ({ title, images, button }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [animated, setAnimated] = useState<{ x: number; y: number }[]>(
    images.map(() => ({ x: 0, y: 0 }))
  );
  const animRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setAnimated((prev) =>
        prev.map((a, i) => {
          const depth = 1 - i * 0.5;
          const targetX = mouse.x * depth;
          const targetY = mouse.y * depth;
          const lerp = (a: number, b: number, t: number) => a + (b - a) * 0.25;
          return {
            x: lerp(a.x, targetX, 0.25),
            y: lerp(a.y, targetY, 0.25),
          };
        })
      );
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current!);
  }, [mouse.x, mouse.y, images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative flex flex-col items-center rounded-xl mx-2 px-4 py-4 transition-all duration-300 group subnav-galaxy-card`}
      style={{ width: 260, minHeight: 320 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-40 h-40 mx-auto"
        style={{ perspective: 1000, zIndex: 20 }}
      >
        {/* If bgGalaxy is present, render GalaxyStars as the first layer */}

        <div
          className="absolute left-1/2 top-1/2 w-40 h-40 object-contain rounded-full transition-all duration-300"
          style={{
            zIndex: 10,
            transform: `translate(-50%, -50%) rotateY(${
              -animated[0]?.x * 30 || 0
            }deg) rotateX(${animated[0]?.y * 30 || 0}deg) translateX(${
              -animated[0]?.x * 30 || 0
            }px) translateY(${animated[0]?.y * 15 || 0}px) scale(${1 + 0.05})`,
            opacity: 1,
          }}
        >
          <img src={bgGalaxy} />
          <GalaxyStars />
        </div>

        {images.map((img, i) => {
          const a = animated[i] || { x: 0, y: 0 };
          const rotateY = -a.x * 30;
          const rotateX = a.y * 30;
          const translateX = -a.x * 30;
          const translateY = a.y * 15;
          return img === bgGalaxy ? null : (
            <img
              key={img}
              src={img}
              alt={title}
              className="absolute left-1/2 top-1/2 w-40 h-40 object-contain rounded-xl transition-all duration-600"
              style={{
                zIndex: 10 + i,
                transform: `
                    translate(-50%, -50%)
                    rotateY(${rotateY}deg)
                    rotateX(${rotateX}deg)
                    translateX(${translateX}px)
                    translateY(${translateY}px)
                    scale(${1 + 0.05 * (1 - i * 0.2)})
                  `,
                opacity: 1 - i * 0.15,
              }}
            />
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <div className="text-yellow-300 font-bold text-lg mb-1">| {title}</div>
        <button className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-1.5 rounded-full shadow hover:scale-105 transition">
          {button}
        </button>
      </div>
    </div>
  );
};

export const SubnavSlider: React.FC = () => {
  return (
    <div className="w-full bg-[#232323] flex items-center justify-center py-4 overflow-x-auto">
      <div
        className="flex flex-nowrap items-stretch justify-start gap-4 px-4"
        style={{ minWidth: 900 }}
      >
        {subnavOptions.map((opt, idx) => (
          <SubnavCard key={opt.title + idx} {...opt} />
        ))}
      </div>
    </div>
  );
};

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
    <div className="main-nav relative">
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
            onMouseEnter={() => handleNavToggle(0)}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            <MdSportsSoccer className="nav-icon" />
            স্পোর্ট
            <FaChevronDown className="nav-dropdown-icon" />
          </a>
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

      {/* subnav */}
      {openSubNav === 0 && (
        <div className="bg-red-500 absolute top-10 left-0 w-full h-full">
          <SubnavSlider />
        </div>
      )}
    </div>
  );
};

export default MainNav;
