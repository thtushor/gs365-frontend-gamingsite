import React, { useState } from "react";
// import { GameSlider } from "../components/GameSlider/GameSlider";
// import { FilterableGames } from "../components/FilterableGames/FilterableGames";
// import { FAQ } from "../components/FAQ/FAQ";
import {
  // crashGames,
  // gamesData,
  // liveGames,
  // newGames,
  seoContent,
  seoTitle,
  // popularGames,
  // slotGames,
} from "../lib/mock";
// import { ProviderGames } from "../components/ProviderGames/ProviderGames";
// import { providerGames } from "../lib/mockProviderGames";
import { GameTypes } from "../components/GameTypes/GameTypes";
import FilterContainer from "../components/UI/FilterContainer";
import GameGrid from "../components/GameGrid";
import SeoSection from "../components/Layout/SeoSection";
import DraggableContainer from "../components/DraggableContainer/DraggableContainer";
import SupportUs from "../components/SupportUs/SupportUs";
import FloatingContact from "../components/FloatingContact/FloatingContact";
import { HeroV2 } from "../components/Hero/HeroV2";
import { NoticeBoard } from "../components/Notice/NoticeBoard"; 
import Advertisement from "../components/Advertisement/Advertisement";
import Sponsors from "../components/Sponsors";
import { Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

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
        <NoticeBoard />
      </div>

      <FilterContainer onFilter={handleFilterChange} onSearch={handleSearch} />

      {/* <FilterableGames games={gamesData} /> */}
      <GameTypes />
      {/* <ProviderGames games={providerGames} /> */}

      {/* Test Gaming Section - Moved to top for first look */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Test Games?</h2>
        <p className="text-gray-400 mb-6">Try out our game collection with real API integration</p>
        <Link 
          to="/test-game" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaGamepad />
          Go to Test Gaming
        </Link>
      </div>

      <GameGrid />
      
      <SeoSection title={seoTitle} content={seoContent} />
      <Advertisement />
      <Sponsors />

      <DraggableContainer
        initialPosition={{
          x: window.innerWidth - 94,
          y: window.innerHeight - 200,
        }}
      >
        <FloatingContact />
      </DraggableContainer>
      <DraggableContainer
        initialPosition={{
          x: window.innerWidth - 94,
          y: window.innerHeight - 120,
        }}
      >
        <SupportUs />
      </DraggableContainer>
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
