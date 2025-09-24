import React from "react";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import "./SupportHomeTab.scss";
import ChatAvatar from "/assets/cs-image.jpg";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import PromotionList from "../Promotion/PromotionList";
import { useQuery } from "@tanstack/react-query";
import { useSupportPanelContext } from "../../contexts/SupportPanelContext";
import { useChat } from "../../contexts/ChatContext";
import moment from "moment";

const SupportHomeTab = () => {
  const getRequest = useGetRequest();

  const { activeTab, handleTabChange, parenScroll, setParentScroll } =
    useSupportPanelContext();

  const { messages } = useChat();

  const {
    data: promotionList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["promotions"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_PROMOTIONS,
        errorMessage: "Failed to fetch promotions",
        isPublic: true,
      }),
  });

  const lastMessage = messages[messages.length - 1]

  return (
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
        <h3 className="font-semibold text-[20px]">
          Welcome to <span className="text-yellow-300">GS365</span>, <br /> How
          can we help you today?
        </h3>
      </div>

     {lastMessage && <div className="support-home-card recent-message-card" onClick={() => {
        handleTabChange("messages")
      }}>
        <div className="recent-message-header">Recent message</div>
        <div className="recent-message-body">
          <img
            className="avatar"
            src={ChatAvatar}
            // src="https://static.intercomassets.com/avatars/6483804/square_128/pexels-dreamlensproduction-2913125-1727340458.jpg"
            alt="avatar"
          />
          <div className="recent-message-info">
            <div className="recent-message-title">Customer support</div>
            {lastMessage && <div className="recent-message-meta">
              {`${lastMessage.content} • ${moment(new Date(lastMessage.createdAt.replace("Z",""))).calendar()}`
              }
            </div>}
          </div>
        </div>
      </div>}

      <div className="support-home-card send-message-card" onClick={() => {
        handleTabChange("messages")
      }}>
        <span>Send us a message</span>
        <FiArrowRight className="arrow-icon" />
      </div>

      <div className="w-full">
        <PromotionList
          className="md:!grid-cols-1 !mb-5"
          promotions={
            Array.isArray(promotionList?.data) && promotionList?.data.length > 0
              ? promotionList?.data.map((promo) => ({
                image: promo?.bannerImg || "/fallback-image.jpg",
                title: promo?.promotionName || "Untitled Promotion",
                description:
                  promo?.description || "No description available.",
                tag: Array.isArray(promo?.promotionType?.data)
                  ? promo?.promotionType?.data
                  : [],
                time: promo?.dateRange || "Date not available",
                signupLink: "/register",
                detailsLink: `/promotions/${promo?.id || "unknown"}`,
              }))
              : []
          }
        />
      </div>

      {/* <div className="support-home-card promo-link-card">
        <span>Alternative Site 1</span>
        <FiExternalLink className="external-link-icon" />
      </div>
      <div className="support-home-card promo-link-card">
        <span>Alternative Site 2</span>
        <FiExternalLink className="external-link-icon" />
      </div> */}
    </div>
  );
};

export default SupportHomeTab;
