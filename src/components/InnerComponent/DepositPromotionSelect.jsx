import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const DepositPromotionSelect = ({
  promotionList,
  selectedPromotion,
  setSelectedPromotion,
  onClose,
  promotionLoading,
}) => {
  const [selectedId, setSelectedId] = useState(selectedPromotion?.id || null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleConfirm = () => {
    const selectedPromo = promotionList.find(
      (promo) => promo.id === selectedPromotion?.id
    );
    if (selectedPromo) {
      // Update selected promotion
      setSelectedPromotion(selectedPromo);
      onClose(); // close modal
    }
  };

  if (promotionLoading) {
    return (
      <div className="game-grid-container flex items-center justify-center loading !p-0 !min-h-[120px] md:!min-h-[300px]">
        <div className="loading-spinner !w-[30px] !h-[30px] md:!w-[50px] md:!h-[50px]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-[#121212] rounded-lg">
      <h1 className="text-xl font-bold text-white mb-4">Select Promotion</h1>

      {/* Promotions List */}
      <div className="space-y-3 h-[40vh] overflow-y-auto py-4" style={{
        scrollbarWidth:"thin"
      }}>
        {promotionList.length === 0 ? (
          <p className="text-center pt-10 text-gray-500">
            No promotions available
          </p>
        ) : (
          promotionList.map((promo) => (
            <div
              key={promo?.id}
              onClick={() => setSelectedPromotion(promo)}
              className={`p-4 rounded-lg border relative text-left cursor-pointer transition-all ${
                selectedPromotion?.id === promo?.id
                  ? "bg-[#1d1d1d] border-yellow-400"
                  : "bg-[#1a1a1a] border-transparent hover:border-gray-600"
              }`}
            >
              {promo?.isRecommended && (
                <div className="absolute top-[-8px] z-50 text-[12px] bg-yellow-300 text-black font-medium px-2 rounded-full">
                  Recommended
                </div>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-[16px] mb-1">
                    {promo?.promotionName || "Title"}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">
                    {promo?.promotionType?.data?.[0]?.title || "Type"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {promo?.dateRange || "Time"}
                  </p>
                </div>
                <div className="mt-1">
                  {selectedPromotion?.id === promo?.id ? (
                    <FaCheckCircle className="border-yellow-400 text-yellow-400 text-lg" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-500 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirm Button */}
      <div className="mt-1">
        <p className="text-[14px] font-normal text-white text-left mb-1">
          Get an extra{" "}
          <span className="text-yellow-300 font-medium">
            {selectedPromotion?.bonus || "0"}%
          </span>
        </p>
        <button
          className="w-full border-yellow-400 hover:border-yellow-600 hover:bg-yellow-400 hover:text-black hover:font-semibold cursor-pointer text-white font-semibold py-2 rounded-md transition"
          disabled={!selectedId}
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DepositPromotionSelect;
