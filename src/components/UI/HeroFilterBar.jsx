import React, { useState } from "react";
import "./HeroFilterBar.scss";

const HeroFilterBar = ({ onFilter }) => {
  const [activeProviders, setActiveProviders] = useState([]);

  const toggleProvider = (providerId) => {
    if (activeProviders.includes(providerId)) {
      setActiveProviders(activeProviders.filter((id) => id !== providerId));
    } else {
      setActiveProviders([...activeProviders, providerId]);
    }

    if (onFilter) {
      onFilter(activeProviders);
    }
  };

  const providers = [
    { id: "jili", name: "JILI" },
    { id: "jdb", name: "JDB" },
    { id: "pgsoft", name: "PG Soft" },
    { id: "yellowbat", name: "Yellow Bat" },
    { id: "fachai", name: "Fa Chai" },
    { id: "spadegaming", name: "Spadegaming" },
    { id: "fastspin", name: "FastSpin" },
    { id: "pragmatic", name: "Pragmatic Play" },
  ];

  return (
    <div className="hero-filter-bar">
      <div className="filter-bar-inner">
        <div className="filter-bar-title">
          <span>আরও ফিল্টার</span>
        </div>
        <div className="filter-bar-items">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`filter-bar-item ${
                activeProviders.includes(provider.id) ? "active" : ""
              }`}
              onClick={() => toggleProvider(provider.id)}
            >
              <input
                type="checkbox"
                id={`filter-${provider.id}`}
                checked={activeProviders.includes(provider.id)}
                onChange={() => {}} // Handled by the onClick on parent div
              />
              <label htmlFor={`filter-${provider.id}`}>
                <span className="check-box"></span>
                <span className="filter-name">{provider.name}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="filter-more-btn">
          <span>আরও দেখুন</span>
        </div>
      </div>
    </div>
  );
};

export default HeroFilterBar;
