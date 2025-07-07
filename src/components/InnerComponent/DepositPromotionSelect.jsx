import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const DepositPromotionSelect = ({
  fakePromotions,
  selectedPromotion,
  setSelectedPromotion,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("valid");
  const [selectedId, setSelectedId] = useState(selectedPromotion?.id || null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const activePromotions = fakePromotions[activeTab];

  const handleConfirm = () => {
    const selectedPromo = fakePromotions[activeTab].find(
      (promo) => promo.id === selectedId
    );
    if (selectedPromo) {
      setSelectedPromotion(selectedPromo);
      onClose(); // close modal
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-[#121212] rounded-lg">
      <h1 className="text-xl font-bold text-white mb-4">Select promotion</h1>

      {/* Tabs */}
      <div className="flex mb-4 border-b border-gray-700">
        {["valid", "invalid"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 font-medium ${
              activeTab === tab
                ? "text-white border-b-2 border-yellow-400"
                : "text-gray-400"
            }`}
          >
            {tab === "valid"
              ? `Valid (${fakePromotions.valid.length})`
              : `Invalid (${fakePromotions.invalid.length})`}
          </button>
        ))}
      </div>

      {/* Promotions List */}
      <div className="space-y-3 h-[400px] overflow-y-auto">
        {activePromotions.length === 0 ? (
          <p className="text-center pt-10 text-gray-500">
            No promotions available
          </p>
        ) : (
          activePromotions.map((promo) => (
            <div
              key={promo.id}
              onClick={() => handleSelect(promo.id)}
              className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                selectedId === promo.id
                  ? "bg-[#1d1d1d] border-yellow-400"
                  : "bg-[#1a1a1a] border-transparent hover:border-gray-600"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-[16px] mb-1">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">{promo.type}</p>
                  <p className="text-xs text-gray-500">{promo.time}</p>
                </div>
                <div className="mt-1">
                  {selectedId === promo.id ? (
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

      {/* Confirm */}
      <div className="mt-2">
        <p className=" text-gray-300 text-base font-medium mb-2 text-left">
          Get an extra <span className="text-yellow-400 font-bold">3%</span>
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
