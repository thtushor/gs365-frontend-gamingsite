import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";

const BaseModal = ({
  open,
  isBackdrop = true,
  onClose,
  showClose = true,
  children,
}) => {
  const modalContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`!fixed inset-0 z-[9999999999999999999999] flex items-center justify-center bg-black ${isBackdrop ? "bg-opacity-60" : "bg-opacity-90"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`rounded-2xl shadow-2xl max-w-[450px]  md:w-full relative ${isBackdrop ? "second-bg p-4 px-3 md:p-6 w-[90%]" : "bg-transparent w-full"}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {showClose && (
              <button
                className="absolute top-3 right-3 text-gray-900 bg-yellow-400 hover:bg-yellow-600 text-xl p-1 rounded"
                onClick={onClose}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Portal it to the dedicated root
  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default BaseModal;
