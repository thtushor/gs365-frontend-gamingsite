/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "./MainNav.scss";
import { FaHome, FaMobileAlt, FaChevronDown } from "react-icons/fa";
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

const subnavSlides = [
  {
    title: "I-Sports",
    images: [
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_03.png",
      "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_02.png",
    ],
  },
  // Add more slides as needed
];

export const SubnavSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [animated, setAnimated] = useState<{ x: number; y: number }[]>(
    subnavSlides[0].images.map(() => ({ x: 0, y: 0 }))
  );
  const animRef = useRef<number>();

  // Animation loop: each image animates toward its own target
  useEffect(() => {
    const animate = () => {
      setAnimated((prev) =>
        prev.map((a, i) => {
          // Each image has a different "depth" factor
          const depth = 1 - i * 0.5; // 1 for top, less for others
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
  }, [mouse.x, mouse.y, currentSlide]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  const goToPrev = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + subnavSlides.length) % subnavSlides.length
    );
  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % subnavSlides.length);

  return (
    <div className="w-full bg-[#232323] flex items-center justify-center py-4 relative overflow-hidden">
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-green-600 transition text-yellow-400 text-2xl shadow-lg"
        aria-label="Previous"
      >
        &#60;
      </button>
      <div
        className="w-[340px] md:w-[520px] h-[200px] flex items-center justify-center relative group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
      >
        {subnavSlides.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-500
              ${
                idx === currentSlide
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-90 z-0"
              }
            `}
          >
            {slide.images.map((img, i) => {
              const a = animated[i] || { x: 0, y: 0 };
              const rotateY = -a.x * 30;
              const rotateX = a.y * 30;
              const translateX = -a.x * 30;
              const translateY = a.y * 15;
              return (
                <img
                  key={img}
                  src={img}
                  alt={slide.title}
                  className={`absolute left-1/2 top-1/2 w-48 md:w-64 h-auto object-contain rounded-xl shadow-2xl transition-all duration-500`}
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
                    boxShadow:
                      i === 0
                        ? "0 0 32px 8px #ffe066, 0 8px 32px 0 #0006"
                        : "0 0 16px 2px #ffe06699",
                    opacity: 1 - i * 0.15,
                  }}
                />
              );
            })}
            {/* Optional: Title or overlay */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-lg font-bold bg-black/60 px-4 py-1 rounded-full shadow">
              {slide.title}
            </div>
          </div>
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
