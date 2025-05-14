import React, { useState } from "react";
import { HeroV2 } from "../components/Hero/HeroV2";
import HeroFilterBar from "../components/UI/HeroFilterBar";
import FilterContainer from "../components/UI/FilterContainer";

const HomePage = () => {
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    // Here you would implement logic to filter content based on selected filters
    console.log("Active filters:", filters);
  };

  return (
    <div className="home-page">
      <HeroV2 />
      <HeroFilterBar onFilter={handleFilterChange} />
      <FilterContainer onFilter={handleFilterChange} />
      {/* Additional content would go here */}
    </div>
  );
};

export default HomePage;
