import React, { useState, useRef, useEffect } from "react";
import "./SeoSection.scss";

interface SeoSectionProps {
  title: string;
  content: string;
}

const SeoSection: React.FC<SeoSectionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Convert the HTML string content to JSX
  const renderContent = () => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div className="seo-section">
      <div className="seo-container">
        <div className="title">
          <span className="title-text text-[16px] md:text-[24px] font-semibold md:font-bold text-center">
            {title}
          </span>
        </div>
        <div
          className={`description-section ${isOpen ? "open" : "collapsed"}`}
          style={{ maxHeight: isOpen ? `${contentHeight}px` : "200px" }} // Initial height
        >
          <div className="description-container" ref={contentRef}>
            <div className="main-landing-page-content text-[12px] md:text-base">
              {renderContent()}
            </div>
          </div>
        </div>
        <button
          className="show-more-btn text-[14px] md:text-base py-[5px] px-[13px] font-semibold md:font-bold sm:py-[10px] sm:px-[20px] btn-default"
          onClick={toggleOpen}
        >
          {isOpen ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default SeoSection;
