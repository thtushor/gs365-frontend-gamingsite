import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer">
      <div className="shimmer_wrapper">
        <div className="shimmer_image-card shimmer_animate"></div>
        <div className="shimmer_stroke shimmer_animate shimmer_title"></div>
        <div className="shimmer_stroke shimmer_animate shimmer_link"></div>
        <div className="shimmer_stroke shimmer_animate shimmer_description"></div>
      </div>
    </div>
  );
};

export default Shimmer;
