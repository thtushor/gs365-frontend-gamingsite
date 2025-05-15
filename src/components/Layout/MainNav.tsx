import React, { useState } from "react";
import "./MainNav.scss";
import { FaHome, FaMobileAlt, FaAngleDown } from "react-icons/fa";

interface SubNavItem {
  title: string;
  img1: string;
  img2: string;
  img3: string;
  vendor: string;
  href?: string;
}

const MainNav: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const sportSubNavItems: SubNavItem[] = [
    {
      title: "I-Sports",
      img1: "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_01.png",
      img2: "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_02.png",
      img3: "https://img.b112j.com/images/web/nav/subnav-slide/i-sports_bdt_03.png",
      vendor: "Saba",
      href: "/guest/viewGame?t=sport&v=Saba&act=50",
    },
    {
      title: "BTi Sports",
      img1: "https://img.b112j.com/images/web/nav/subnav-slide/sbtech_bdt_01.png",
      img2: "https://img.b112j.com/images/web/nav/subnav-slide/sbtech_bdt_02.png",
      img3: "https://img.b112j.com/images/web/nav/subnav-slide/sbtech_bdt_03.png",
      vendor: "SBTech",
      href: "/guest/viewGame?t=sport&v=SBTech&act=SBTech",
    },
    {
      title: "Exchange",
      img1: "https://img.b112j.com/images/web/nav/subnav-slide/exchange_bdt_01.png",
      img2: "https://img.b112j.com/images/web/nav/subnav-slide/exchange_bdt_02.png",
      img3: "https://img.b112j.com/images/web/nav/subnav-slide/exchange_bdt_03.png",
      vendor: "CRICKET",
      href: "/guest/viewGame?t=sport&v=CRICKET",
    },
    {
      title: "SBO Sports",
      img1: "https://img.b112j.com/images/web/nav/subnav-slide/sbobet_bdt_01.png",
      img2: "https://img.b112j.com/images/web/nav/subnav-slide/sbobet_bdt_02.png",
      img3: "https://img.b112j.com/images/web/nav/subnav-slide/sbobet_bdt_03.png",
      vendor: "SBOv2",
    },
    {
      title: "UG Sports",
      img1: "https://img.b112j.com/images/web/nav/subnav-slide/unitedgaming_bdt_01.png",
      img2: "https://img.b112j.com/images/web/nav/subnav-slide/unitedgaming_bdt_02.png",
      img3: "https://img.b112j.com/images/web/nav/subnav-slide/unitedgaming_bdt_03.png",
      vendor: "UGv3",
    },
    {
      title: "CMD Sports",
      img1: "https://img.b112j.com/images/web/nav/subnav-slide/cmd_bdt_01.png",
      img2: "https://img.b112j.com/images/web/nav/subnav-slide/cmd_bdt_02.png",
      img3: "https://img.b112j.com/images/web/nav/subnav-slide/cmd_bdt_03.png",
      vendor: "CMD",
      href: "/guest/viewGame?t=sport&v=CMD&act=CMD",
    },
    {
      title: "E-Sports",
      img1: "https://img.b112j.com/images/web/nav/subnav-slide/e1_bdt_01.png",
      img2: "https://img.b112j.com/images/web/nav/subnav-slide/e1_bdt_02.png",
      img3: "https://img.b112j.com/images/web/nav/subnav-slide/e1_bdt_03.png",
      vendor: "AWCV2_E1SPORT",
    },
    {
      title: "Horsebook",
      img1: "https://img.b112j.com/images/web/nav/subnav-slide/horsebook_bdt_01.png",
      img2: "https://img.b112j.com/images/web/nav/subnav-slide/horsebook_bdt_02.png",
      img3: "https://img.b112j.com/images/web/nav/subnav-slide/horsebook_bdt_03.png",
      vendor: "AWCV2_HORSEBOOK",
    },
  ];

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  const [subNavIndex, setSubNavIndex] = useState(0);
  const visibleItems = 4;

  const nextSubNav = () => {
    if (subNavIndex + visibleItems < sportSubNavItems.length) {
      setSubNavIndex(subNavIndex + 1);
    }
  };

  const prevSubNav = () => {
    if (subNavIndex > 0) {
      setSubNavIndex(subNavIndex - 1);
    }
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
        <li
          className={`nav-item ${activeDropdown === "sport" ? "active" : ""}`}
          onMouseEnter={() => toggleDropdown("sport")}
          onMouseLeave={() => toggleDropdown("")}
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            স্পোর্ট <FaAngleDown className="nav-dropdown-icon" />
          </a>
          {activeDropdown === "sport" && (
            <div className="sub-nav-slide">
              <div className="sub-nav-inner">
                <button
                  className="arrow-prev"
                  disabled={subNavIndex === 0}
                  onClick={prevSubNav}
                ></button>
                <div className="sub-nav-draggable">
                  <div className="sub-nav-track">
                    {sportSubNavItems
                      .slice(subNavIndex, subNavIndex + visibleItems)
                      .map((item, index) => (
                        <div className="sub-nav-item" key={index}>
                          <span>{item.title}</span>
                          <a href={item.href || "#"} data-vendor={item.vendor}>
                            <div
                              className="item-box"
                              style={{
                                transform:
                                  index === 0
                                    ? "perspective(400px) rotateX(12.57deg) rotateY(-8.51deg) scale3d(1.08, 1.08, 1.08)"
                                    : "",
                              }}
                            >
                              <img
                                className="item-1st"
                                src={item.img1}
                                alt={`${item.vendor} Betting`}
                                style={
                                  index === 0
                                    ? {
                                        transform:
                                          "perspective(600px) scale3d(1.1, 1.1, 1.1)",
                                      }
                                    : {}
                                }
                              />
                              <img
                                className="item-2nd"
                                src={item.img2}
                                alt={`${item.vendor} Betting`}
                                style={
                                  index === 0
                                    ? {
                                        transform:
                                          "perspective(600px) scale3d(1.05, 1.05, 1.05) translate(4.19px, -2.84px)",
                                      }
                                    : {}
                                }
                              />
                              <img
                                className="item-3rd"
                                src={item.img3}
                                alt={`${item.vendor} Betting`}
                                style={
                                  index === 0
                                    ? {
                                        transform:
                                          "perspective(1800px) scale3d(1.02, 1.02, 1.02) translate(12.57px, -8.51px)",
                                      }
                                    : {}
                                }
                              />
                            </div>
                            <p>এখনি খেলুন</p>
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
                <button
                  className="arrow-next"
                  disabled={
                    subNavIndex + visibleItems >= sportSubNavItems.length
                  }
                  onClick={nextSubNav}
                ></button>
              </div>
            </div>
          )}
        </li>
        <li className="nav-item">
          <a href="/casino/">ক্যাসিনো</a>
        </li>
        <li className="nav-item">
          <a href="/slot/">স্লট</a>
        </li>
        <li className="nav-item">
          <a href="/table/">টেবিল</a>
        </li>
        <li className="nav-item">
          <a href="/fishing/">ফিশিং</a>
        </li>
        <li className="nav-item">
          <a href="/crash/">ক্রাশ</a>
        </li>
        <li className="nav-item">
          <a href="/arcade/">আর্কেড</a>
        </li>
        <li className="nav-item">
          <a href="/lottery/">লটারি</a>
        </li>
        <li className="nav-item">
          <a href="/promotions.jsp">প্রমোশনাল অফার</a>
        </li>
        <li className="nav-item">
          <a href="/vip/">ভিআইপি</a>
        </li>
        <li className="nav-item">
          <a href="/referral/">রেফারেল</a>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
