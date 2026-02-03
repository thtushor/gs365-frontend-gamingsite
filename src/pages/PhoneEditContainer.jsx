import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { pageList } from "./PersonalInformation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/api/axios";
import { API_ENDPOINTS } from "../lib/api/config";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { LuBadgeCheck } from "react-icons/lu";
import { CgCloseO } from "react-icons/cg";
import VerifyPhoneOtpModal from "../components/Modal/VerifyPhoneOtpModal";

const PhoneEditContainer = () => {
  const { logout: handleContextLogout } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");

    if (userData && accessToken) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        handleContextLogout();
      }
    }
  }, []);

  const userId = user?.id || user?._id || user?.userId;
  const phonesQueryKey = useMemo(() => ["user-phones", userId], [userId]);

  // Fetch: get user phones
  const { data: phonesData, isLoading: phonesLoading } = useQuery({
    enabled: Boolean(userId),
    queryKey: phonesQueryKey,
    queryFn: async () => {
      const url = API_ENDPOINTS.USER_PHONES.BY_USER.replace(":userId", String(userId));
      const res = await axiosInstance.get(url);
      return res.data?.data || [];
    },
    staleTime: 30_000,
  });

  // Create
  const createPhoneMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post(API_ENDPOINTS.USER_PHONES.CREATE, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: phonesQueryKey });
      setFormState(INIT_FORM);
    },
  });

  // Update
  const updatePhoneMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const url = API_ENDPOINTS.USER_PHONES.UPDATE.replace(":id", String(id));
      const res = await axiosInstance.post(url, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: phonesQueryKey });
      setEditingId(null);
      setFormState(INIT_FORM);
    },
  });

  // Delete
  const deletePhoneMutation = useMutation({
    mutationFn: async (id) => {
      const url = API_ENDPOINTS.USER_PHONES.DELETE.replace(":id", String(id));
      const res = await axiosInstance.post(url);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: phonesQueryKey }),
  });

  // Form state
  const INIT_FORM = {
    phoneNumber: "",
    isPrimary: false,
    isSmsCapable: true,
  };
  const [formState, setFormState] = useState(INIT_FORM);
  const [editingId, setEditingId] = useState(null);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    // all the value should be digits except the + pls
    setFormState((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value?.replaceAll(" ", "").replace(/[^0-9+]/g, "") }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) return;

    if (editingId) {
      updatePhoneMutation.mutate({ id: editingId, payload: { ...formState, userId } });
    } else {
      if ((phonesData || []).length >= 3) {
        alert("Maximum 3 phone numbers allowed.");
        return;
      }
      createPhoneMutation.mutate({ ...formState, userId });
    }
  };

  const handleEdit = (phone) => {
    setEditingId(phone.id || phone._id);
    setFormState({
      phoneNumber: phone.phoneNumber,
      isPrimary: phone.isPrimary,
      isSmsCapable: phone.isSmsCapable,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormState(INIT_FORM);
  };

  const handleDelete = (record) => {
    if (!record?.id && !record?._id) return;
    if (window.confirm("Are you sure you want to delete this phone number?")) {
      const id = record.id || record._id;
      deletePhoneMutation.mutate(id);
    }
  };

  const openVerifyModal = (phone) => {
    setSelectedPhone(phone);
    setIsOtpModalOpen(true);
  };

  const togglePrimary = (record) => {
    const id = record.id || record._id;
    updatePhoneMutation.mutate({
      id,
      payload: { ...record, isPrimary: !record.isPrimary, userId }
    });
  };

  return (
    <div className="common-container min-h-[65vh]">
      <h1 className="text-left text-[18px] md:text-[20px] font-semibold py-5 mt-10">
        My Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 items-start">
        {/* Sidebar */}
        <div className="col-span-full md:col-span-1 lg:col-span-2 overflow-hidden text-left border light-border rounded-md">
          {pageList?.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => navigate(p.link)}
              className={`${idx === pageList.length - 1 ? "" : "border-b"} py-3 px-5 text-[14px] font-medium md:text-[16px] hover:opacity-70 border-white border-opacity-15 cursor-pointer hover:bg-opacity-80 ${location.pathname === p.link ? "light-bg" : ""
                }`}
            >
              {p.name}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="col-span-full md:col-span-2 lg:col-span-4 text-left border light-border rounded-md">
          <h3 className="text-white text-[18px] md:text-[20px] p-4 font-semibold">
            {editingId ? "Edit Phone" : "Add Phone"}
          </h3>

          {/* Create/Edit form */}
          {((phonesData || []).length < 3 || editingId) ? (
            <form onSubmit={handleSubmit} className="p-4 border-b border-white border-opacity-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Phone number {editingId && phonesData?.find(p => (p.id || p._id) === editingId)?.isVerified && "(Locked: Already Verified)"}
                  </label>
                  <input
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={onChange}
                    disabled={editingId && phonesData?.find(p => (p.id || p._id) === editingId)?.isVerified}
                    placeholder="e.g. +8801XXXXXXXXX"
                    className={`w-full bg-transparent border light-border rounded px-3 py-2 text-white outline-none ${editingId && phonesData?.find(p => (p.id || p._id) === editingId)?.isVerified ? "opacity-50 cursor-not-allowed" : ""}`}
                    required
                  />
                </div>
                <div className="flex items-center gap-6 mt-2 md:mt-7">
                  <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPrimary"
                      checked={formState.isPrimary}
                      onChange={onChange}
                    />
                    Primary
                  </label>
                  <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      name="isSmsCapable"
                      checked={formState.isSmsCapable}
                      onChange={onChange}
                    />
                    SMS Capable
                  </label>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  disabled={createPhoneMutation.isPending || updatePhoneMutation.isPending || !userId}
                  className="px-4 py-2 rounded bg-primary hover:opacity-90 disabled:opacity-50"
                >
                  {createPhoneMutation.isPending || updatePhoneMutation.isPending ? "Saving..." : editingId ? "Update Phone" : "Add Phone"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2 rounded border light-border hover:bg-white hover:bg-opacity-5"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="p-4 border-b border-white border-opacity-10 text-yellow-500 text-sm">
              You have reached the maximum limit of 3 phone numbers.
            </div>
          )}

          {/* Phones list */}
          <div className="divide-y divide-white divide-opacity-10">
            {phonesLoading ? (
              <div className="p-6 text-gray-300">Loading phones...</div>
            ) : (phonesData || []).length === 0 ? (
              <div className="p-6 text-gray-300">No phone numbers added yet.</div>
            ) : (
              (phonesData || []).map((phone) => (
                <div
                  key={phone.id || phone._id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 hover:bg-[#1a1a1a]"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-[14px] md:text-[16px] font-medium">
                        {phone.phoneNumber}
                      </p>
                      {phone.isVerified ? (
                        <span className="text-green-500" title="Verified">
                          <LuBadgeCheck />
                        </span>
                      ) : (
                        <span className="text-red-500" title="Unverified">
                          <CgCloseO />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded ${phone.isPrimary ? "bg-green-600/30 text-green-400 border border-green-600/50" : "bg-gray-700/30 text-gray-400 border border-gray-700/50"
                        }`}>
                        {phone.isPrimary ? "Primary" : "Secondary"}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${phone.isSmsCapable ? "bg-blue-600/30 text-blue-400 border border-blue-600/50" : "bg-gray-700/30 text-gray-400 border border-gray-700/50"
                        }`}>
                        {phone.isSmsCapable ? "SMS Enabled" : "No SMS"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 md:mt-0 flex-wrap">
                    {!phone.isVerified && (
                      <button
                        onClick={() => openVerifyModal(phone)}
                        className="px-3 py-1 text-xs rounded bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 hover:bg-yellow-600 hover:text-white transition-all"
                      >
                        Verify Now
                      </button>
                    )}
                    <button
                      onClick={() => togglePrimary(phone)}
                      className="px-3 py-1 text-xs rounded border light-border hover:bg-white hover:bg-opacity-5"
                    >
                      {phone.isPrimary ? "Unset Primary" : "Set Primary"}
                    </button>
                    <button
                      onClick={() => handleEdit(phone)}
                      className="px-3 py-1 text-xs rounded border light-border hover:bg-white hover:bg-opacity-5"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(phone)}
                      className="px-2 py-1 text-sm rounded border border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <IoRemoveCircleOutline />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {selectedPhone && (
        <VerifyPhoneOtpModal
          isOpen={isOtpModalOpen}
          onClose={() => setIsOtpModalOpen(false)}
          phoneId={selectedPhone.id || selectedPhone._id}
          phoneNumber={selectedPhone.phoneNumber}
          onVerified={() => {
            queryClient.invalidateQueries({ queryKey: phonesQueryKey });
          }}
        />
      )}
    </div>
  );
};

export default PhoneEditContainer;
