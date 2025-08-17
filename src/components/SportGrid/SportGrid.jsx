import React, { useState } from "react";
import "../GameGrid/GameGrid.scss";
import { Logo } from "../Logo/Logo";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import GameCardComponent from "../GameCard/GameCardComponent";

const SportGrid = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sportsPerPage] = useState(12);

  const getRequest = useGetRequest();

  // Fetch categories
  const { data: categoriesList, isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getRequest({
        url: `${BASE_URL + API_LIST.GET_CATEGORIES}?id=2`,
      }),
  });

  const categoryOption = categoriesList?.data?.options || [];

  // Fetch sports
  const { data: sportsData, isLoading: sportsLoading } = useQuery({
    queryKey: ["sports", activeCategory, currentPage],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_CATEGORY_WISE_SPORT,
        params:
          activeCategory === "all"
            ? { page: currentPage, pageSize: sportsPerPage }
            : {
                page: currentPage,
                pageSize: sportsPerPage,
                categoryId: Number(activeCategory),
              },
      }),
    keepPreviousData: true,
  });

  const sports = sportsData?.data || [];
  const totalSports = sportsData?.pagination?.total || 0;

  // Handlers
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset page when category changes
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const progressPercentage = Math.min((sports.length / totalSports) * 100, 100);

  if (categoryLoading || sportsLoading) {
    return (
      <div className="game-grid-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  return (
    <div className="game-grid-container mt-5">
      <h2 className="game-grid-title">Live Sports ({totalSports})</h2>

      {/* Category Tabs */}
      <div className="category-tabs">
        <button
          className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleCategoryChange("all")}
        >
          All Sport
        </button>
        {categoryOption.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${
              activeCategory === String(category.id) ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(String(category.id))}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Game Grid */}
      <div className="flex flex-wrap gap-[6px] md:gap-3 items-center justify-center">
        {sports.map((game, index) => (
          <div key={game.id} style={{ animationDelay: `${index * 0.05}s` }}>
            <GameCardComponent gameDetails={game} />
          </div>
        ))}
      </div>

      {/* No Sport */}
      {sports.length === 0 && (
        <div className="no-games-message">
          No sports found in this category.
        </div>
      )}

      {/* Load More */}
      {sports.length < totalSports && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            আরও লোড করুন
          </button>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {totalSports}টির মধ্যে {sports.length}টি দেখানো হয়েছে
          </div>
        </div>
      )}
    </div>
  );
};

export default SportGrid;
