import React, { useState } from "react";
import "./SupportHelpTab.scss";
import {
  SearchIcon,
  ChevronRightIcon,
  BookOpenIcon,
  GripVerticalIcon,
} from "lucide-react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

const collections = [
  {
    title: "Baji টিপস",
    articles: 16,
    icon: "🎯",
    color: "#FFD93D",
  },
  {
    title: "Baji VIP Club Frequently Asked Questions",
    articles: 28,
    icon: "👑",
    color: "#FF6B6B",
  },
  {
    title: "Payment ( পেমেন্ট )",
    articles: 22,
    icon: "💳",
    color: "#4CAF50",
  },
  {
    title: "Account ( একাউন্ট )",
    articles: 23,
    icon: "👤",
    color: "#2196F3",
  },
  {
    title: "Promotions ( প্রোমশন )",
    articles: 8,
    icon: "🎁",
    color: "#9C27B0",
  },
];

const SupportHelpTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    console.log({ e });
    setIsDragging(false);
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      handle=".drag-handle"
      bounds="parent"
      position={position}
      onStart={handleDragStart}
      onStop={handleDragStop}
      defaultPosition={{ x: 0, y: 0 }}
    >
      <div className={`support-help-tab ${isDragging ? "dragging" : ""}`}>
        <div className="drag-handle">
          <GripVerticalIcon />
        </div>
        <div className="help-header">
          <h2>Help Center</h2>
          <p className="subtitle">Find answers to your questions</p>
        </div>

        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            className="support-help-search"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="collections-list">
          <div className="collections-header">
            <BookOpenIcon className="collections-icon" />
            <h3>Knowledge Base</h3>
            <span className="collection-count">
              {collections.length} collections
            </span>
          </div>

          <ul>
            {collections.map((col, i) => (
              <li
                key={i}
                className="collection-item"
                style={{ "--accent-color": col.color } as React.CSSProperties}
              >
                <div className="collection-icon">{col.icon}</div>
                <div className="collection-content">
                  <div className="title">{col.title}</div>
                  <div className="articles">{col.articles} articles</div>
                </div>
                <ChevronRightIcon className="chevron-icon" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Draggable>
  );
};

export default SupportHelpTab;
