import React, { useState } from "react";
import "./SupportHelpTab.scss";
import {
  SearchIcon,
  ChevronRightIcon,
  BookOpenIcon,
  ArrowLeftIcon,
} from "lucide-react";

// Random color generator
const getRandomColor = () => {
  const colors = [
    "#FFD93D",
    "#FF6B6B",
    "#4CAF50",
    "#2196F3",
    "#9C27B0",
    "#FF9800",
    "#673AB7",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const collections = [
  {
    id: 1,
    title: "Baji টিপস",
    articles: 16,
    icon: "🎯",
    color: getRandomColor(),
    questions: [
      {
        id: 1,
        question: "How to play Baji tips?",
        answer: "You can start by...",
      },
      {
        id: 2,
        question: "Is Baji safe?",
        answer: "Yes, Baji is safe because...",
      },
    ],
  },
  {
    id: 2,
    title: "Baji VIP Club Frequently Asked Questions",
    articles: 28,
    icon: "👑",
    color: getRandomColor(),
    questions: [
      { id: 1, question: "How to join VIP?", answer: "You must apply from..." },
      {
        id: 2,
        question: "What are VIP benefits?",
        answer: "VIP members enjoy...",
      },
    ],
  },
  {
    id: 3,
    title: "Payment ( পেমেন্ট )",
    articles: 22,
    icon: "💳",
    color: getRandomColor(),
    questions: [
      {
        id: 1,
        question: "How to deposit?",
        answer: "You can deposit using...",
      },
      {
        id: 2,
        question: "How to withdraw?",
        answer: "Withdraw is processed via...",
      },
    ],
  },
  {
    id: 4,
    title: "Account ( একাউন্ট )",
    articles: 23,
    icon: "👤",
    color: getRandomColor(),
    questions: [
      {
        id: 1,
        question: "How to create account?",
        answer: "Click signup and...",
      },
      {
        id: 2,
        question: "How to reset password?",
        answer: "Go to forgot password...",
      },
    ],
  },
  {
    id: 5,
    title: "Promotions ( প্রোমশন )",
    articles: 8,
    icon: "🎁",
    color: getRandomColor(),
    questions: [
      {
        id: 1,
        question: "How to claim bonus?",
        answer: "Go to promotions and...",
      },
    ],
  },
];

const SupportHelpTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleBack = () => {
    if (selectedQuestion) {
      setSelectedQuestion(null);
    } else if (selectedCollection) {
      setSelectedCollection(null);
    }
  };

  return (
    <div className="support-help-tab">
      <div className="help-header">
        {(selectedCollection || selectedQuestion) && (
          <div
            onClick={handleBack}
            className="flex items-center rounded-md px-1 py-1 w-fit pr-2  text-black font-semibold mb-[6px] bg-orange-500 cursor-pointer text-[14px]"
          >
            <ArrowLeftIcon size={16} /> Back
          </div>
        )}

        {!selectedCollection && !selectedQuestion && (
          <>
            <h2>Help Center</h2>
            <p className="subtitle">Find answers to your questions</p>
          </>
        )}

        {selectedCollection && !selectedQuestion && (
          <h2 className="!text-[16px]">{selectedCollection.title}</h2>
        )}

        {selectedQuestion && (
          <h2 className="!text-[16px]">{selectedQuestion.question}</h2>
        )}
      </div>

      {/* Search only on main screen */}
      {!selectedCollection && !selectedQuestion && (
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input
            className="support-help-search"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Screen 1: Collections */}
      {!selectedCollection && !selectedQuestion && (
        <div className="collections-list">
          <div className="collections-header">
            <BookOpenIcon className="collections-icon" />
            <h3>Knowledge Base</h3>
            <span className="collection-count">
              {collections.length} collections
            </span>
          </div>

          <ul>
            {collections.map((col) => (
              <li
                key={col.id}
                className="collection-item"
                style={{ "--accent-color": col.color }}
                onClick={() => setSelectedCollection(col)}
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
      )}

      {/* Screen 2: Questions list */}
      {selectedCollection && !selectedQuestion && (
        <div className="collections-list">
          <ul>
            {selectedCollection.questions.map((q) => (
              <li
                key={q.id}
                className="collection-item"
                style={{ "--accent-color": selectedCollection.color }}
                onClick={() => setSelectedQuestion(q)}
              >
                <div className="collection-icon">❓</div>
                <div className="collection-content">
                  <div className="title">{q.question}</div>
                </div>
                <ChevronRightIcon className="chevron-icon" />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Screen 3: Single Question */}
      {selectedQuestion && (
        <div className="collections-list">
          <ul>
            <li
              className="collection-item"
              style={{ "--accent-color": selectedCollection.color }}
            >
              <div className="collection-content">
                <div className="title">{selectedQuestion.answer}</div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SupportHelpTab;
