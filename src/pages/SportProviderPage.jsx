import React from "react";
import ProviderGames from "../components/GameGrid/ProviderGames";
import { useSearchParams } from "react-router-dom";

const SportProviderPage = () => {
  const [searchParams] = useSearchParams();
  const providerName = searchParams.get("providerName");
  return (
    <div className="max-w-[1200px] px-[15px] mx-auto text-left">
      <div className="py-10">
        {providerName ? (
          <h1 className="text-[18px] md:text-[22px] font-semibold border-l-[2px] sm:border-l-[4px] pl-1 border-yellow-300">
            Sports of <span className="text-yellow-300">{providerName}</span>
          </h1>
        ) : (
          <h1 className="text-[18px] md:text-[22px] font-semibold border-l-[2px] sm:border-l-[4px] pl-1 border-yellow-300">
            Provider Wise Sports
          </h1>
        )}

        <ProviderGames />
      </div>
    </div>
  );
};

export default SportProviderPage;
