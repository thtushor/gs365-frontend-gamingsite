import React from "react";
import ProviderGames from "../components/GameGrid/ProviderGames";
import { useSearchParams } from "react-router-dom";
import { API_LIST, BASE_URL, useGetRequest } from "../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Providers } from "../components/GameGrid/Providers";

const AllProviders = ({ type }) => {
  const getRequest = useGetRequest();

  // Fetch all provider list
  const {
    data: providersData,
    isLoading: providerLoading,
    providerErr,
  } = useQuery({
    queryKey: ["providers"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ALL_PROVIDERS,
      }),
  });

  if (providerLoading) {
    return (
      <div className="game-types-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  if (providerErr) {
    return;
  }

  return (
    <div className="max-w-[1200px] px-[15px] mx-auto text-left pt-5">
      <div className="">
        <h1 className="text-[18px] capitalize md:text-[22px] font-semibold border-l-[4px] pl-1 border-yellow-300">
          {type} Providers
        </h1>

        <Providers
          providerList={
            type === "games"
              ? providersData?.data?.game_providers || []
              : providersData?.data?.sports_providers || []
          }
          type={type}
        />
      </div>
    </div>
  );
};

export default AllProviders;
