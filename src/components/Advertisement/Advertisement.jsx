import React from "react";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import Shimmer from "../../lib/api/Shimmer";

const Advertisement = () => {
  const getRequest = useGetRequest();

  const {
    data: advertisementData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["advertisement"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ACTIVE_ADVERTISEMENT,
        errorMessage: "Failed to fetch advertisement",
        isPublic: true,
      }),
  });

  const ad = advertisementData?.data;

  const getYoutubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = ad?.videoUrl ? getYoutubeId(ad.videoUrl) : null;

  if (isLoading) {
    return <Shimmer />;
  }

  if (isError || !ad) {
    return null;
  }
  return (
    <div className="game-grid-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        <div className="aspect-video">
          {videoId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-[3px] border-yellow-300 rounded-xl"
            ></iframe>
          ) : (
            <p>Invalid YouTube URL</p>
          )}
        </div>
        <div>
          <h1 className="text-[16px] mb-3 font-semibold md:font-bold text-yellow-300 md:text-[28px]">
            {ad.title}
          </h1>
          <div
            className="text-white text-sm md:text-base [&_table]:w-full 
    [&_table]:text-white 
    [&_td]:px-2 
    [&_th]:px-2 
    [&_table]:border 
    [&_th]:border 
    [&_td]:border 
    [&_table]:border-white 
    [&_td]:border-white 
    [&_th]:border-white 
    [&_ul]:list-disc 
    [&_ol]:list-decimal 
    [&_ul]:pl-5 
    [&_ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: ad.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
