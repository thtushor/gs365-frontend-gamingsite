import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./MainNav.scss";
import { FaHome, FaChevronDown } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { RiVipDiamondFill } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const MainNav = () => {
  const [activePage, setActivePage] = useState("/");
  const [openSubNav, setOpenSubNav] = useState(null);
  const [subMenuAnimationState, setSubMenuAnimationState] = useState("closed");
  const navRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openTimerRef = useRef(null);
  const location = useLocation();

  const getRequest = useGetRequest();

  const { data: menuList } = useQuery({
    queryKey: ["menus"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ALL_MENU_PROVIDERS,
        errorMessage: "Failed to fetch menus",
      }),
    keepPreviousData: true,
  });

  // Merge all menus into one array with type
  const mergedMenu = [
    ...(menuList?.data?.category_menu || []).map((item) => ({
      ...item,
      type: "category",
    })),
    ...(menuList?.data?.sports_providers || []).map((item) => ({
      ...item,
      type: "sports",
    })),
    ...(menuList?.data?.game_providers || []).map((item) => ({
      ...item,
      type: "games",
    })),
  ];

  // Sort by menuPriority with validation
  const sortedMenu = mergedMenu
    .filter((item) => item && typeof item.menuPriority === "number")
    .sort((a, b) => a.menuPriority - b.menuPriority);

  // Submenu animation
  useEffect(() => {
    if (openSubNav !== null) {
      setSubMenuAnimationState("opening");
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      openTimerRef.current = window.setTimeout(
        () => setSubMenuAnimationState("open"),
        300
      );
    } else {
      setSubMenuAnimationState("closing");
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = window.setTimeout(
        () => setSubMenuAnimationState("closed"),
        300
      );
    }

    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [openSubNav]);

  // Click outside to close submenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
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
      onMouseLeave={() => openSubNav !== null && setOpenSubNav(null)}
    >
      <ul className="nav-inner">
        <li className={`nav-item ${activePage === "/" ? "active" : ""}`}>
          <Link to="/">
            <FaHome className="nav-icon" />
          </Link>
        </li>

        {sortedMenu.map((menu) => {
          if (!menu?.id || (!menu.name && !menu.title)) return null;

          const isActive =
            menu.type === "category"
              ? activePage.startsWith(`/category/${menu.id}`)
              : activePage.startsWith(`/provider/${menu.id}`) &&
                new URLSearchParams(location.search).get("type") === menu.type;

          const link =
            menu.type === "category"
              ? `/category/${menu.id}`
              : `/provider/${menu.id}?type=${menu.type}&providerName=${menu.name}`;

          return (
            <li
              key={`${menu.type}-${menu.id}`}
              className={`nav-item mr-4 ${isActive ? "active" : ""}`}
            >
              <Link to={link}>
                {menu.icon && (
                  <img src={menu.icon} alt={menu.name} className="w-[16px]" />
                )}
                {menu.imgUrl && (
                  <img
                    src={menu.imgUrl}
                    alt={menu.title}
                    className="w-[16px]"
                  />
                )}
                {menu.name || menu.title}
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
      </ul>
    </div>
  );
};

export default memo(MainNav);
