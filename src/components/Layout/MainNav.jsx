import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./MainNav.scss";
import { FaHome, FaChevronDown } from "react-icons/fa";
import { BsFillTrophyFill } from "react-icons/bs";
import { GiPokerHand } from "react-icons/gi";
import { MdSportsSoccer, MdCasino, MdLiveTv } from "react-icons/md";
import { RiVipDiamondFill, RiGamepadFill } from "react-icons/ri";
import bgGalaxy from "../../assets/sports/galaxy.png";
import GalaxyStars from "./GalaxyStars";
import { useLocation, Link } from "react-router-dom";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";

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
  {
    title: "SBO Sports",
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
  {
    title: "SBO Sports",
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
  {
    title: "SBO Sports",
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

// Memoize the SubnavCard component to prevent unnecessary re-renders
const SubnavCard = memo(({ title, images, button }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [animated, setAnimated] = useState(images.map(() => ({ x: 0, y: 0 })));
  const animRef = useRef();
  const cardRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      setAnimated((prev) =>
        prev.map((a, i) => {
          const depth = 1 - i * 0.5;
          const targetX = mouse.x * depth;
          const targetY = mouse.y * depth;
          const lerp = (a, b, t) => a + (b - a) * t;
          return {
            x: lerp(a.x, targetX, 0.1),
            y: lerp(a.y, targetY, 0.1),
          };
        })
      );
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [mouse.x, mouse.y, images.length]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center rounded-xl mx-2 px-3 py-3 transition-all duration-300 group subnav-galaxy-card"
      style={{
        width: 200,
        height: 200,
        flexShrink: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-[100px] h-[100px] mx-auto"
        style={{ perspective: 1000, zIndex: 20 }}
      >
        <div
          className="absolute left-1/2 top-1/2 w-[100px] h-[100px] object-contain rounded-full transition-all duration-300"
          style={{
            zIndex: 10,
            transform: `translate(-50%, -50%) rotateY(${
              -animated[0]?.x * 30 || 0
            }deg) rotateX(${animated[0]?.y * 30 || 0}deg) translateX(${
              -animated[0]?.x * 20 || 0
            }px) translateY(${animated[0]?.y * 10 || 0}px) scale(${1 + 0.05})`,
            opacity: 1,
          }}
        >
          <img src={bgGalaxy} className="w-full h-full object-contain" />
          <GalaxyStars />
        </div>

        {images.map((img, i) => {
          const a = animated[i] || { x: 0, y: 0 };
          const rotateY = -a.x * 30;
          const rotateX = a.y * 30;
          const translateX = -a.x * 20;
          const translateY = a.y * 10;
          return img === bgGalaxy ? null : (
            <img
              key={img}
              src={img}
              alt={title}
              className="absolute left-1/2 top-1/2 w-[100px] h-[100px] object-contain rounded-xl transition-all duration-600"
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
      <div className="mt-3 text-center">
        <div className="text-yellow-300 font-bold text-base mb-1">
          | {title}
        </div>
        <button className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-1 rounded-full text-sm shadow hover:scale-105 transition">
          {button}
        </button>
      </div>
    </div>
  );
});

// Memoize the SubnavSlider component
const SubnavSlider = memo(() => {
  const sliderRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkOverflow = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollWidth, clientWidth } = sliderRef.current;
    setHasOverflow(scrollWidth > clientWidth);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      checkOverflow();
      window.addEventListener("resize", checkOverflow);
      return () => window.removeEventListener("resize", checkOverflow);
    }
  }, [checkOverflow]);

  const scroll = useCallback((direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    const newScrollLeft =
      sliderRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !sliderRef.current) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full bg-[#232323] flex items-center justify-center py-3 relative">
      {hasOverflow && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 z-10 bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/70 transition-colors shadow-lg"
            aria-label="Scroll left"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 z-10 bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/70 transition-colors shadow-lg"
            aria-label="Scroll right"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
      <div
        ref={sliderRef}
        className="flex flex-nowrap items-stretch justify-start gap-3 px-4 overflow-x-auto custom-scrollbar cursor-grab active:cursor-grabbing"
        style={{ minWidth: "min(900px, 100vw)" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {subnavOptions.map((opt, idx) => (
          <SubnavCard key={opt.title + idx} {...opt} />
        ))}
      </div>
    </div>
  );
});

const MainNav = () => {
  const [activePage, setActivePage] = useState("/");
  const [openSubNav, setOpenSubNav] = useState(null); // number or null
  const [subMenuAnimationState, setSubMenuAnimationState] = useState("closed"); // "closed", "opening", "open", "closing"
  const navRef = useRef(null); // ref to a div
  const closeTimerRef = useRef(null); // ref to store timeout id
  const openTimerRef = useRef(null); // ref to store timeout i
  const location = useLocation();

  const getRequest = useGetRequest();

  const {
    data: menuList,
    isLoading: menuLoading,
    isError: menuErr,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ALL_MENU_PROVIDERS,
        errorMessage: "Failed to fetch banners list",
      }),
    keepPreviousData: true,
  });

  const gameMenus = menuList?.data?.game_providers || [];
  const sportMenu = menuList?.data?.sports_providers || [];
  const categoryMenu = menuList?.data?.category_menu || [];

  // Handle submenu state transitions
  useEffect(() => {
    if (openSubNav !== null) {
      setSubMenuAnimationState("opening");
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      openTimerRef.current = window.setTimeout(() => {
        setSubMenuAnimationState("open");
      }, 300);
    } else {
      setSubMenuAnimationState("closing");
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = window.setTimeout(() => {
        setSubMenuAnimationState("closed");
      }, 300);
    }

    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [openSubNav]);

  // Handle click outside for the main submenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        subMenuAnimationState === "open"
      ) {
        setOpenSubNav(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [subMenuAnimationState]);

  const handleNavToggle = useCallback((index) => {
    setOpenSubNav((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    setActivePage(location?.pathname);
  }, [location]);

  return (
    <div
      className="main-nav relative"
      ref={navRef}
      onMouseLeave={() => {
        if (subMenuAnimationState === "open") {
          setOpenSubNav(null);
        }
      }}
    >
      <ul className="nav-inner">
        <li className={`nav-item ${activePage === "/" ? "active" : ""}`}>
          <Link to="/">
            <FaHome className="nav-icon" />
          </Link>
        </li>
        {/* <li
          className={`nav-item ${
            openSubNav === 0 || activePage === "/sports" ? "active" : ""
          }`}
        >
          <Link
            to="/sports"
            onClick={(e) => {
              e.preventDefault();
              handleNavToggle(0);
            }}
            onMouseEnter={() => handleNavToggle(0)}
          >
            <MdSportsSoccer className="nav-icon" />
            Sports
            <FaChevronDown className="nav-dropdown-icon" />
          </Link>
        </li> */}
        {gameMenus.length > 0 &&
          gameMenus.map((menu) => {
            const isActive =
              activePage.startsWith(`/provider/${menu?.id}`) &&
              new URLSearchParams(location.search).get("type") === "games";

            return (
              <li
                key={menu.id}
                className={`nav-item mr-4 ${isActive ? "active" : ""}`}
              >
                <Link
                  to={`/provider/${menu?.id}?type=games&providerName=${menu?.name}`}
                >
                  {menu?.icon && (
                    <img
                      src={menu.icon || ""}
                      alt={menu.name || ""}
                      className="w-[16px]"
                    />
                  )}
                  {menu.name || ""}
                </Link>
              </li>
            );
          })}
        {sportMenu.length > 0 &&
          sportMenu.map((menu) => {
            const isActive =
              activePage.startsWith(`/provider/${menu?.id}`) &&
              new URLSearchParams(location.search).get("type") === "sports";

            return (
              <li
                key={menu.id}
                className={`nav-item mr-4 ${isActive ? "active" : ""}`}
              >
                <Link
                  to={`/provider/${menu?.id}?type=sports&providerName=${menu?.name}`}
                >
                  {menu?.icon && (
                    <img
                      src={menu.icon || ""}
                      alt={menu.name || ""}
                      className="w-[16px]"
                    />
                  )}
                  {menu.name || ""}
                </Link>
              </li>
            );
          })}
        {categoryMenu.length > 0 &&
          categoryMenu.map((menu) => {
            const isActive = location.pathname.startsWith(
              `/category/${menu.id}`
            );
            return (
              <li
                key={menu.id}
                className={`nav-item mr-4 ${isActive ? "active" : ""}`}
              >
                <Link to={`/category/${menu.id}`}>
                  {menu?.imgUrl && (
                    <img
                      src={menu.imgUrl || ""}
                      alt={menu.title || ""}
                      className="w-[16px]"
                    />
                  )}
                  {menu.title || ""}
                </Link>
              </li>
            );
          })}

        <li className={`nav-item ${activePage === "/vip" ? "active" : ""}`}>
          <Link to="/vip">
            <RiVipDiamondFill className="nav-icon" />
            VIP
          </Link>
        </li>
        <li
          className={`nav-item ${activePage === "/promotions" ? "active" : ""}`}
        >
          <Link to="/promotions">
            <MdLiveTv className="nav-icon" />
            Promotion
          </Link>
        </li>
        {/* <li
          className={`nav-item ${activePage === "/profile/referral-details" ? "active" : ""}`}
        >
          <Link to="/profile/referral-details">রেফারেল</Link>
        </li> */}
      </ul>

      {/* Subnav with animation states */}
      <div
        className={`sub-nav-slide ${subMenuAnimationState}`}
        style={{
          display: subMenuAnimationState === "closed" ? "none" : "block",
        }}
      >
        <SubnavSlider />
      </div>

      {/* Floating Contact Button and Submenu - Now a separate component */}
    </div>
  );
};

export default memo(MainNav);
