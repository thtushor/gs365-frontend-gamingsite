import React, { useState } from "react";
import PromotionCard from "./PromotionCard";
import PromotionModal from "./PromotionModal";
import { motion, AnimatePresence } from "framer-motion";

interface Promotion {
  image: string;
  title: string;
  description: string;
  tag: string;
  time: string;
  signupLink: string;
  detailsLink: string;
}

interface PromotionListProps {
  promotions: Promotion[];
}

const PromotionList: React.FC<PromotionListProps> = ({ promotions }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );

  const handleShowMore = () => setVisibleCount((c) => c + 8);
  const handleCardClick = (promo: Promotion) => {
    setSelectedPromotion(promo);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.slice(0, visibleCount).map((promo, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              onClick={() => handleCardClick(promo)}
              className="cursor-pointer"
            >
              <PromotionCard {...promo} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      {visibleCount < promotions.length && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-8 rounded-lg shadow-lg text-lg transition"
            onClick={handleShowMore}
          >
            আরও দেখুন
          </button>
        </div>
      )}
      <PromotionModal
        open={modalOpen}
        onClose={handleCloseModal}
        promotion={selectedPromotion}
      />
    </>
  );
};

export default PromotionList;
