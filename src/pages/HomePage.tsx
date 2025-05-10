import React from "react";
// import { GameSlider } from "../components/GameSlider/GameSlider";
import { FilterableGames } from "../components/FilterableGames/FilterableGames";
import { NoticeBoard } from "../components/Notice/NoticeBoard";
import { FAQ } from "../components/FAQ/FAQ";
import {
  // crashGames,
  gamesData,
  // liveGames,
  // newGames,
  notices,
  // popularGames,
  // slotGames,
} from "../lib/mock";
import { HeroV2 } from "../components/Hero/HeroV2";
import { ProviderGames } from "../components/ProviderGames/ProviderGames";
import { providerGames } from "../lib/mockProviderGames";

// import { Hero } from "../components/Hero/Hero";
// import { NoticeBoardCard } from "../components/Notice/NoticeBoardCard";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroV2 />
      <div className="notice-section">
        <NoticeBoard notices={notices} />
      </div>
      {/* <NoticeBoardCard players={players} /> */}
      <FilterableGames games={gamesData} />
      <ProviderGames games={providerGames} />
      {/* <GameSlider title="CRASH GAMES" games={crashGames} />
      <GameSlider title="POPULAR SLOTS" games={slotGames} />
      <GameSlider title="LIVE CASINO" games={liveGames} />
      <GameSlider title="TRENDING NOW" games={popularGames} />
      <GameSlider title="NEW RELEASES" games={newGames} />
      <GameSlider title="EXCLUSIVE GAMES" games={crashGames} /> */}
      <FAQ />
    </div>
  );
};

export default HomePage;
