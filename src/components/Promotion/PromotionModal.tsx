import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegClock, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Tag {
  id: number;
  title: string;
  dropdown_id: number;
  status: string;
  created_by: string;
  created_at: string;
}
interface Promotion {
  image: string;
  title: string;
  description: string;
  tag: Tag[];
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
              className="absolute top-3 right-3 text-gray-900 bg-yellow-400 hover:bg-yellow-600 text-xl"
              onClick={onClose}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <div className="w-full overflow-hidden">
              <img
                src={promotion.image}
                alt={promotion.title}
                className="object-cover h-[200px] w-full transition-transform duration-500 group-hover:scale-110 rounded-t-2xl"
              />
            </div>
            {promotion.tag?.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mb-3 mt-4">
                {promotion.tag.map((t, idx) => (
                  <p
                    key={idx}
                    className="text-gray-400 rounded-[4px] px-2 text-[10px] border-gray-400 border"
                  >
                    {t?.title}
                  </p>
                ))}
              </div>
            )}
            <div className="flex items-center mb-3">
              <span className="flex items-center bg-gray-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">
                <FaRegClock className="mr-1 text-yellow-400" /> {promotion.time}
              </span>
            </div>
            <h3 className="text-[16px] text-left md:text-[18px] font-semibold text-white mb-2 leading-tight drop-shadow-sm">
              {promotion.title}
            </h3>
            {/* <p className="text-gray-100 mb-3 text-base leading-relaxed">
              {promotion.description}
            </p> */}
            {/* <div className="flex items-center mb-4">
              <span className="flex items-center bg-gray-700 text-yellow-200 text-xs font-semibold px-3 py-1 rounded-full">
                <FaRegClock className="mr-1 text-yellow-400" /> {promotion.time}
              </span>
            </div> */}
            {/* <div className="flex flex-col md:flex-row gap-2 mt-2">
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
            </div> */}
            <div className="flex flex-col md:flex-row gap-2 mt-2">
              <Link
                to={promotion?.detailsLink}
                className="w-full md:w-auto border-yellow-400 hover:border-white text-yellow-400 hover:text-white font-medium py-1 px-3 rounded-md transition text-[14px] shadow-md text-center border"
              >
                Read more
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
