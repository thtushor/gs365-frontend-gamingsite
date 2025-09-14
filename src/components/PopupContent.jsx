import React from "react";
import { FaTimes } from "react-icons/fa";

const PopupContent = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="popup-content-wrapper">
      <button
        className="absolute top-0 right-0 md:top-[-10px] md:right-[-10px] text-gray-900 bg-yellow-400 hover:bg-yellow-600 text-xl p-1 rounded"
        onClick={onClose}
        aria-label="Close"
      >
        <FaTimes />
      </button>
      <h2
        className="text-[18px] md:text-[22px] font-bold text-gray-900 w-fit rounded-full px-5 mx-auto mt-1
       mb-5 bg-yellow-300"
      >
        {data.title}
      </h2>
      <div
        className="popup-message [&_table]:w-full 
    [&_table]:text-white 
    [&_td]:px-2 
    [&_th]:px-2 
    [&_table]:border 
    [&_th]:border 
    [&_td]:border 
    [&_table]:border-white 
    [&_td]:border-white 
    [&_th]:border-white 
    [&_ul]:list-disc 
    [&_ol]:list-decimal 
    [&_ul]:pl-5 
    [&_ol]:pl-5 
    [&_li]:text-white"
        dangerouslySetInnerHTML={{ __html: data.message }}
      />
    </div>
  );
};

export default PopupContent;
