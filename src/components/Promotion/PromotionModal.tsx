import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegClock, FaTimes } from "react-icons/fa";

interface Promotion {
  image: string;
  title: string;
  description: string;
  tag: string;
  time: string;
  signupLink: string;
  detailsLink: string;
}

interface PromotionModalProps {
  open: boolean;
  onClose: () => void;
  promotion: Promotion | null;
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  open,
  onClose,
  promotion,
}) => {
  if (!promotion) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-yellow-400 text-xl"
              onClick={onClose}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <div className="w-full h-56 rounded-xl overflow-hidden mb-4">
              <img
                src={promotion.image}
                alt={promotion.title}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 text-xs font-bold px-4 py-1 rounded-full shadow mb-3">
              {promotion.tag}
            </span>
            <h3 className="text-2xl font-extrabold text-yellow-300 mb-2 leading-tight">
              {promotion.title}
            </h3>
            <p className="text-gray-100 mb-3 text-base leading-relaxed">
              {promotion.description}
            </p>
            <div className="flex items-center mb-4">
              <span className="flex items-center bg-gray-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">
                <FaRegClock className="mr-1 text-yellow-400" /> {promotion.time}
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-2">
              <a
                href={promotion.signupLink}
                className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition text-base shadow-md text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                সাইনআপ
              </a>
              <a
                href={promotion.detailsLink}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition text-base shadow-md text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                বিস্তারিত
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
