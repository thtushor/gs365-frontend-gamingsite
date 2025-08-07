import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  showRecommended = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  // Set initial selected option
  useEffect(() => {
    if (value && options.length > 0) {
      const found = options.find(option => option.name === value || option.id === value);
      setSelectedOption(found || null);
    }
  }, [value, options]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Select Button */}
      <div
        className={`relative cursor-pointer transition-all duration-200 ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-yellow-400"
        } border border-yellow-400 rounded-md px-4 py-3 second-bg font-medium outline-none text-white`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedOption ? (
              <div className="flex items-center gap-2">
                <span className="text-white">{selectedOption.name}</span>
                {showRecommended && selectedOption.isRecomended && (
                  <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                    Recommended
                  </span>
                )}
              </div>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <IoIosArrowDown
            className={`transition-transform duration-200 text-yellow-400 ${
              isOpen ? "rotate-180" : ""
            }`}
            size={20}
          />
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#1a1a1a] border border-yellow-400 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-gray-400 text-center">
              No options available
            </div>
          ) : (
            options.map((option, index) => (
              <div
                key={option.id || index}
                className={`px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-yellow-400 hover:text-black ${
                  selectedOption?.id === option.id
                    ? "bg-yellow-400 text-black"
                    : "text-white"
                } ${
                  index !== options.length - 1 ? "border-b border-gray-700" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{option.name}</span>
                    {showRecommended && option.isRecomended && (
                      <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                        Recommended
                      </span>
                    )}
                  </div>
                  {selectedOption?.id === option.id && (
                    <MdOutlineRadioButtonChecked size={20} />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect; 