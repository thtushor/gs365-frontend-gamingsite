import React from "react";
import BaseModal from "../Promotion/BaseModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/api/axios";
import { API_ENDPOINTS } from "../../lib/api/config";
import { useAuth } from "../../contexts/auth-context";

const ClaimableNotificationModal = ({
  open,
  setIsOpen,
  onClose,
  notification,
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isExpired = new Date(notification.endDate) < new Date();

  const claimMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        notificationId: notification?.id || notification?._id,
        userId: user?.id,
      };
      const res = await axiosInstance.post(
        API_ENDPOINTS.PAYMENT.CLAIM_NOTIFICATION,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", user.id],
      });
      onClose && onClose();
    },
  });

  const handleSubmit = () => {
    claimMutation.mutate();
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className="text-center">
        {notification?.posterImg && (
          <img
            src={notification?.posterImg}
            alt={notification?.title}
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
        )}
        <h2 className="text-lg font-bold text-white">{notification?.title}</h2>
        <p
          className="text-sm text-gray-300 mb-4 [&_table]:w-full 
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
    [&_li]:text-white 
    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-5
    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-5
    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5
    [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-5
    [&_h5]:text-base [&_h5]:font-medium [&_h5]:mt-5
    [&_h6]:text-sm [&_h6]:font-medium [&_h6]:mt-5"
          dangerouslySetInnerHTML={{ __html: notification?.description }}
        />
        <div className="header-auth">
          <button
            disabled={isExpired || claimMutation.isPending}
            onClick={handleSubmit}
            className={`mx-auto signup-btn !pt-1 rounded-lg font-medium ${isExpired
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-black"
              }`}
          >
            {isExpired
              ? "Expired"
              : claimMutation.isPending
                ? "Claiming..."
                : "Claim Now"}{" "}
            {notification?.amount > 0 ? `- ${notification?.amount} BDT` : ""}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ClaimableNotificationModal;
