import React from "react";
import ProviderGames from "../components/GameGrid/ProviderGames";
import { useSearchParams } from "react-router-dom";

const GameProviderPage = () => {
  const [searchParams] = useSearchParams();
  const providerName = searchParams.get("providerName");
  return (
    <div className="max-w-[1200px] px-[15px] mx-auto text-left">
      <div className="py-5 md:py-10">
        <h1 className="text-[18px] md:text-[22px] font-semibold border-l-[4px] pl-1 border-yellow-300">
          Play Now
        </h1>

        <ProviderGames />
      </div>
    </div>
  );
};

export default GameProviderPage;
