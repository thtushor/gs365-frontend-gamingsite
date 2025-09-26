import React, { useState } from "react";
import "./SupportHelpTab.scss";
import {
  SearchIcon,
  ChevronRightIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  XIcon,
} from "lucide-react";
import { API_LIST, BASE_URL, useGetRequest } from "../../lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const SupportHelpTab = ({
  onClose
}) => {
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

  const getRequest = useGetRequest();

  const {
    data: activeFaqs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: () =>
      getRequest({
        url: BASE_URL + API_LIST.GET_ACTIVE_FAQ,
        errorMessage: "Failed to fetch active faqs",
        isPublic: true,
      }),
  });

  const collections = activeFaqs?.data || [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-end items-center">
        <span onClick={() => {
          onClose?.();
        }}><XIcon className="text-gray-400 h-4 w-4 cursor-pointer" />
        </span>
      </div>
      <div className="support-help-tab">

        <div className="help-header">
          {(selectedCollection || selectedQuestion) && (
            <div
              onClick={handleBack}
              className="flex items-center rounded-md px-1 py-1 w-fit pr-2  text-black font-semibold mb-4 bg-orange-500 cursor-pointer text-[14px]"
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
            <h2 className="!text-[14px] flex flex-col !font-medium capitalize border border-red-500 pt-[6px] bg-red-500/5 rounded-md px-[7px] pb-[1px]">
              <span
                className={`bg-red-500 text-black w-fit text-[12px] font-semibold px-1 rounded-[4px]`}
              >
                Question:
              </span>
              {selectedQuestion.question}
            </h2>
          )}
        </div>

        {/* Screen 1: Collections */}
        {!selectedCollection && !selectedQuestion && (
          <div className="collections-list">
            <div className="collections-header">
              <BookOpenIcon className="collections-icon mb-[-3px]" />
              <h3>Category Base</h3>
              <span className="collection-count">
                {collections.length} Categories
              </span>
            </div>

            {collections.length === 0 ? (
              <p>There are no FAQs available</p>
            ) : (
              <ul>
                {collections.map((col) => {
                  if (col?.questions?.length < 1) {
                    return;
                  } else {
                    return (
                      <li
                        key={col.id}
                        className="collection-item"
                        style={{ "--accent-color": col.color }}
                        onClick={() => setSelectedCollection(col)}
                      >
                        <div className="collection-icon">{col.icon}</div>
                        <div className="collection-content">
                          <div className="title">{col.title}</div>
                          <div className="articles">{col.articles} questions</div>
                        </div>
                        <ChevronRightIcon className="chevron-icon" />
                      </li>
                    );
                  }
                })}
              </ul>
            )}
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
          <div className="collections-list !mt-[-6px]">
            <ul>
              <li
                className="border border-green-500 bg-green-500/5 py-[1px] pt-[2px] rounded-md px-[6px]"
                style={{ "--accent-color": selectedCollection.color }}
              >
                <span
                  className={`bg-green-500 text-black text-[12px] font-semibold px-1 pb-[1px] rounded-[4px]`}
                >
                  Answer
                </span>
                <div className="collection-content">
                  {/* Answer comes with HTML tags */}
                  <div
                    className="title text-[14px]"
                    dangerouslySetInnerHTML={{ __html: selectedQuestion.answer }}
                  />
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

  );
};

export default SupportHelpTab;
