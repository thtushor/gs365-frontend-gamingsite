import React, { useState, useEffect, useRef } from "react";
import "./FilterContainer.scss";

const FilterContainer = ({ onFilter, onSearch }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilters, setShowAllFilters] = useState(false);
  const filtersContainerRef = useRef(null);

  const toggleFilter = (filterId) => {
    if (activeFilters.includes(filterId)) {
      const newFilters = activeFilters.filter((id) => id !== filterId);
      setActiveFilters(newFilters);
      if (onFilter) onFilter(newFilters);
    } else {
      const newFilters = [...activeFilters, filterId];
      setActiveFilters(newFilters);
      if (onFilter) onFilter(newFilters);
    }
  };

  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  const toggleShowAllFilters = () => {
    setShowAllFilters(!showAllFilters);
    // If toggling to show filters, expand the providers category by default
    if (!showAllFilters) {
      setExpandedCategory("providers");
    }
  };

  useEffect(() => {
    // Smooth scroll to filters when expanded
    if (showAllFilters && filtersContainerRef.current) {
      setTimeout(() => {
        filtersContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [showAllFilters]);

  // Provider list for quick filters
  const providers = [
    { id: "jili", name: "JILI" },
    { id: "jdb", name: "JDB" },
    { id: "pgsoft", name: "PG Soft" },
    { id: "yellowbat", name: "Yellow Bat" },
    { id: "fachai", name: "Fa Chai" },
    { id: "spadegaming", name: "Spadegaming" },
    { id: "fastspin", name: "FastSpin" },
  ];

  const renderQuickFilters = () => {
    return providers.slice(0, 5).map((provider) => (
      <div
        key={provider.id}
        className={`filter-bar-item ${
          activeFilters.includes(provider.id) ? "active" : ""
        }`}
        onClick={() => toggleFilter(provider.id)}
      >
        <input
          type="checkbox"
          id={`quick-filter-${provider.id}`}
          checked={activeFilters.includes(provider.id)}
          onChange={() => {}} // Handled by onClick
        />
        <label htmlFor={`quick-filter-${provider.id}`}>
          <span className="check-box"></span>
          <span className="filter-name">{provider.name}</span>
        </label>
      </div>
    ));
  };

  return (
    <div className="filter-container">
      {/* Top filter bar with search and quick filters */}
      <div className="filter-top-bar">
        <div className="filter-bar-inner">
          {/* Search bar */}
          <div className="search-bar">
            <div className="search-input-wrap">
              <i className="search-icon"></i>
              <input
                type="text"
                placeholder="গেমস অনুসন্ধান করুন"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Quick filter section */}
          <div className="quick-filter-section">
            <div className="filter-bar-title">
              <span>ফিল্টার:</span>
            </div>
            <div className="filter-bar-items-container">
              <div className="filter-bar-items">{renderQuickFilters()}</div>
            </div>
            <div
              className={`filter-more-btn ${showAllFilters ? "active" : ""}`}
              onClick={toggleShowAllFilters}
            >
              <span>
                {showAllFilters ? "ফিল্টার সংকুচিত করুন" : "আরও ফিল্টার"}
              </span>
              <i className={`arrow-icon ${showAllFilters ? "up" : "down"}`}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded filters section */}
      <div
        ref={filtersContainerRef}
        className={`expanded-filters ${showAllFilters ? "show" : ""}`}
      >
        <div className="filter-column">
          {/* Game Provider Section */}
          <div className="filter-section">
            <div
              className={`section-header ${
                expandedCategory === "providers" ? "active" : ""
              }`}
              onClick={() => toggleCategory("providers")}
            >
              <h4>গেম প্রোভাইডার</h4>
              <span
                className={`arrow-icon ${
                  expandedCategory === "providers" ? "expanded" : ""
                }`}
              >
                ▼
              </span>
            </div>

            <div
              className={`section-content ${
                expandedCategory === "providers" ? "expanded" : ""
              }`}
            >
              <div className="filter-options">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className={`filter-option ${
                      activeFilters.includes(provider.id) ? "active" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`filter-${provider.id}`}
                      checked={activeFilters.includes(provider.id)}
                      onChange={() => toggleFilter(provider.id)}
                    />
                    <label htmlFor={`filter-${provider.id}`}>
                      <span className="check-box"></span>
                      <span className="filter-name">{provider.name}</span>
                    </label>
                  </div>
                ))}
                <div
                  className={`filter-option ${
                    activeFilters.includes("pragmatic") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-pragmatic"
                    checked={activeFilters.includes("pragmatic")}
                    onChange={() => toggleFilter("pragmatic")}
                  />
                  <label htmlFor="filter-pragmatic">
                    <span className="check-box"></span>
                    <span className="filter-name">Pragmatic Play</span>
                  </label>
                </div>
                <div
                  className={`filter-option ${
                    activeFilters.includes("netent") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-netent"
                    checked={activeFilters.includes("netent")}
                    onChange={() => toggleFilter("netent")}
                  />
                  <label htmlFor="filter-netent">
                    <span className="check-box"></span>
                    <span className="filter-name">Netent</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Game Type Section */}
          <div className="filter-section">
            <div
              className={`section-header ${
                expandedCategory === "types" ? "active" : ""
              }`}
              onClick={() => toggleCategory("types")}
            >
              <h4>গেমের ধরন</h4>
              <span
                className={`arrow-icon ${
                  expandedCategory === "types" ? "expanded" : ""
                }`}
              >
                ▼
              </span>
            </div>

            <div
              className={`section-content ${
                expandedCategory === "types" ? "expanded" : ""
              }`}
            >
              <div className="filter-options">
                <div
                  className={`filter-option ${
                    activeFilters.includes("popular") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-popular"
                    checked={activeFilters.includes("popular")}
                    onChange={() => toggleFilter("popular")}
                  />
                  <label htmlFor="filter-popular">
                    <span className="check-box"></span>
                    <span className="filter-name">জনপ্রিয় গেমস</span>
                  </label>
                </div>
                <div
                  className={`filter-option ${
                    activeFilters.includes("new") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-new"
                    checked={activeFilters.includes("new")}
                    onChange={() => toggleFilter("new")}
                  />
                  <label htmlFor="filter-new">
                    <span className="check-box"></span>
                    <span className="filter-name">নতুন গেমস</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="filter-section">
            <div
              className={`section-header ${
                expandedCategory === "themes" ? "active" : ""
              }`}
              onClick={() => toggleCategory("themes")}
            >
              <h4>থিম</h4>
              <span
                className={`arrow-icon ${
                  expandedCategory === "themes" ? "expanded" : ""
                }`}
              >
                ▼
              </span>
            </div>

            <div
              className={`section-content ${
                expandedCategory === "themes" ? "expanded" : ""
              }`}
            >
              <div className="filter-options">
                <div
                  className={`filter-option ${
                    activeFilters.includes("all") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-all"
                    checked={activeFilters.includes("all")}
                    onChange={() => toggleFilter("all")}
                  />
                  <label htmlFor="filter-all">
                    <span className="check-box"></span>
                    <span className="filter-name">অল</span>
                  </label>
                </div>
                <div
                  className={`filter-option ${
                    activeFilters.includes("lucky7") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-lucky7"
                    checked={activeFilters.includes("lucky7")}
                    onChange={() => toggleFilter("lucky7")}
                  />
                  <label htmlFor="filter-lucky7">
                    <span className="check-box"></span>
                    <span className="filter-name">লাকি 7</span>
                  </label>
                </div>
                <div
                  className={`filter-option ${
                    activeFilters.includes("financial") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-financial"
                    checked={activeFilters.includes("financial")}
                    onChange={() => toggleFilter("financial")}
                  />
                  <label htmlFor="filter-financial">
                    <span className="check-box"></span>
                    <span className="filter-name">ফাইন্যান্সিয়াল</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Special Features Section */}
          <div className="filter-section">
            <div
              className={`section-header ${
                expandedCategory === "features" ? "active" : ""
              }`}
              onClick={() => toggleCategory("features")}
            >
              <h4>স্পেশাল ফিচার</h4>
              <span
                className={`arrow-icon ${
                  expandedCategory === "features" ? "expanded" : ""
                }`}
              >
                ▼
              </span>
            </div>

            <div
              className={`section-content ${
                expandedCategory === "features" ? "expanded" : ""
              }`}
            >
              <div className="filter-options">
                <div
                  className={`filter-option ${
                    activeFilters.includes("bonus") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-bonus"
                    checked={activeFilters.includes("bonus")}
                    onChange={() => toggleFilter("bonus")}
                  />
                  <label htmlFor="filter-bonus">
                    <span className="check-box"></span>
                    <span className="filter-name">বোনাস গেম</span>
                  </label>
                </div>
                <div
                  className={`filter-option ${
                    activeFilters.includes("feature") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-feature"
                    checked={activeFilters.includes("feature")}
                    onChange={() => toggleFilter("feature")}
                  />
                  <label htmlFor="filter-feature">
                    <span className="check-box"></span>
                    <span className="filter-name">ফিচার কিনুন</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Pay-Line Section */}
          <div className="filter-section">
            <div
              className={`section-header ${
                expandedCategory === "paylines" ? "active" : ""
              }`}
              onClick={() => toggleCategory("paylines")}
            >
              <h4>পে-লাইন</h4>
              <span
                className={`arrow-icon ${
                  expandedCategory === "paylines" ? "expanded" : ""
                }`}
              >
                ▼
              </span>
            </div>

            <div
              className={`section-content ${
                expandedCategory === "paylines" ? "expanded" : ""
              }`}
            >
              <div className="filter-options">
                <div
                  className={`filter-option ${
                    activeFilters.includes("1") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-1"
                    checked={activeFilters.includes("1")}
                    onChange={() => toggleFilter("1")}
                  />
                  <label htmlFor="filter-1">
                    <span className="check-box"></span>
                    <span className="filter-name">১</span>
                  </label>
                </div>
                <div
                  className={`filter-option ${
                    activeFilters.includes("10") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-10"
                    checked={activeFilters.includes("10")}
                    onChange={() => toggleFilter("10")}
                  />
                  <label htmlFor="filter-10">
                    <span className="check-box"></span>
                    <span className="filter-name">১০</span>
                  </label>
                </div>
                <div
                  className={`filter-option ${
                    activeFilters.includes("20") ? "active" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="filter-20"
                    checked={activeFilters.includes("20")}
                    onChange={() => toggleFilter("20")}
                  />
                  <label htmlFor="filter-20">
                    <span className="check-box"></span>
                    <span className="filter-name">২০</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
