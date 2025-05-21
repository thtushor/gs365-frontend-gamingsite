import React, { useState } from "react";
// import { GameSlider } from "../components/GameSlider/GameSlider";
// import { FilterableGames } from "../components/FilterableGames/FilterableGames";
import { NoticeBoard } from "../components/Notice/NoticeBoard";
// import { FAQ } from "../components/FAQ/FAQ";
import {
  // crashGames,
  // gamesData,
  // liveGames,
  // newGames,
  notices,
  seoContent,
  seoTitle,
  // popularGames,
  // slotGames,
} from "../lib/mock";
import { HeroV2 } from "../components/Hero/HeroV2";
// import { ProviderGames } from "../components/ProviderGames/ProviderGames";
// import { providerGames } from "../lib/mockProviderGames";
import { GameTypes } from "../components/GameTypes/GameTypes";
import FilterContainer from "../components/UI/FilterContainer";
import GameGrid from "../components/GameGrid";
import Sponsors from "../components/Sponsors";
import SeoSection from "../components/Layout/SeoSection";
// import { NoticeBoardCard } from "../components/Notice/NoticeBoardCard";

const HomePage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  console.log({ activeFilters, searchTerm });

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    // Here you would implement logic to filter content based on selected filters
    console.log("Active filters:", filters);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Here you would implement search logic
    console.log("Search term:", term);
  };

  return (
    <div className="home-page">
      <HeroV2 />

      <div className="notice-section">
        <NoticeBoard notices={notices} />
      </div>

      <FilterContainer onFilter={handleFilterChange} onSearch={handleSearch} />

      {/* <NoticeBoardCard players={players} /> */}
      {/* <FilterableGames games={gamesData} /> */}
      <GameTypes />
      {/* <ProviderGames games={providerGames} /> */}

      <GameGrid />
      <SeoSection title={seoTitle} content={seoContent} />
      <Sponsors />
      {/* <GameSlider title="CRASH GAMES" games={crashGames} />
      <GameSlider title="POPULAR SLOTS" games={slotGames} />
      <GameSlider title="LIVE CASINO" games={liveGames} />
      <GameSlider title="TRENDING NOW" games={popularGames} />
      <GameSlider title="NEW RELEASES" games={newGames} />
      <GameSlider title="EXCLUSIVE GAMES" games={crashGames} /> */}
      {/* <FAQ /> */}
    </div>
  );
};

export default HomePage;
