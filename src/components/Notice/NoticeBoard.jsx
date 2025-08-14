import React from "react";
import { FaBullhorn } from "react-icons/fa";
import "./NoticeBoard.scss";
import { useQuery } from "@tanstack/react-query";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";

export const NoticeBoard = () => {
  const getRequest = useGetRequest();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["announcement"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ANNOUNCEMENTS,
        errorMessage: "Failed to fetch announcement",
        isPublic: true,
      }),
    keepPreviousData: true,
  });

  const announcement = data?.data?.description || "";

  return announcement ? (
    <div className="notice-board">
      <div className="notice-content">
        <FaBullhorn className="notice-icon" style={{ color: "#fff" }} />
        <div className="marquee-container">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="4"
            onMouseOver={(e) => e.currentTarget.stop()}
            onMouseOut={(e) => e.currentTarget.start()}
            className="text-[12px] md:text-base font-normal md:font-medium mt-[6px]"
          >
            {isLoading
              ? "Loading announcement..."
              : isError
              ? "Failed to load announcement."
              : announcement
              ? announcement
              : "No announcement available."}
          </marquee>
        </div>
      </div>
    </div>
  ) : null;
};
