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
          <span className="title-text">{title}</span>
        </div>
        <div
          className={`description-section ${isOpen ? "open" : "collapsed"}`}
          style={{ maxHeight: isOpen ? `${contentHeight}px` : "200px" }} // Initial height
        >
          <div className="description-container" ref={contentRef}>
            <div className="main-landing-page-content">{renderContent()}</div>
          </div>
        </div>
        <button className="show-more-btn btn-default" onClick={toggleOpen}>
          {isOpen ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default SeoSection;
