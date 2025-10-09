import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { pageList } from "./PersonalInformation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/api/axios";
import { API_ENDPOINTS } from "../lib/api/config";
import { IoRemoveCircleOutline } from "react-icons/io5";

const PhoneEditContainer = () => {
  const { logout: handleContextLogout } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Load user from localStorage to match pattern used in other profile pages
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
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: phonesQueryKey }),
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
    isVerified: false,
    isSmsCapable: true,
  };
  const [formState, setFormState] = useState(INIT_FORM);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!userId) return;
    const payload = { userId, ...formState };
    createPhoneMutation.mutate(payload);
  };

  const toggleField = (record, field) => {
    if (!record?.id && !record?._id) return;
    const id = record.id || record._id;
    const payload = {
      userId,
      phoneNumber: record.phoneNumber,
      isPrimary: field === "isPrimary" ? !record.isPrimary : !!record.isPrimary,
      isVerified: field === "isVerified" ? !record.isVerified : !!record.isVerified,
      isSmsCapable:
        field === "isSmsCapable" ? !record.isSmsCapable : !!record.isSmsCapable,
    };
    updatePhoneMutation.mutate({ id, payload });
  };

  const handleDelete = (record) => {
    if (!record?.id && !record?._id) return;
    const id = record.id || record._id;
    deletePhoneMutation.mutate(id);
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
              className={`${idx === pageList.length - 1 ? "" : "border-b"} py-3 px-5 text-[14px] font-medium md:text-[16px] hover:opacity-70 border-white border-opacity-15 cursor-pointer hover:bg-opacity-80 ${
                location.pathname === p.link ? "light-bg" : ""
              }`}
            >
              {p.name}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="col-span-full md:col-span-2 lg:col-span-4 text-left border light-border rounded-md">
          <h3 className="text-white text-[18px] md:text-[20px] p-4 font-semibold">
            Edit Phone
          </h3>

          {/* Create form */}
          <form onSubmit={handleCreate} className="p-4 border-b border-white border-opacity-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Phone number</label>
                <input
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={onChange}
                  placeholder="e.g. +8801XXXXXXXXX"
                  className="w-full bg-transparent border light-border rounded px-3 py-2 text-white outline-none"
                  required
                />
              </div>
              <div className="flex items-center gap-6 mt-2 md:mt-7">
                <label className="flex items-center gap-2 text-gray-300 text-sm">
                  <input
                    type="checkbox"
                    name="isPrimary"
                    checked={formState.isPrimary}
                    onChange={onChange}
                  />
                  Primary
                </label>
                <label className="flex items-center gap-2 text-gray-300 text-sm">
                  <input
                    type="checkbox"
                    name="isVerified"
                    checked={formState.isVerified}
                    onChange={onChange}
                  />
                  Verified
                </label>
                <label className="flex items-center gap-2 text-gray-300 text-sm">
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
            <div className="mt-4">
              <button
                type="submit"
                disabled={createPhoneMutation.isPending || !userId}
                className="px-4 py-2 rounded bg-primary hover:opacity-90 disabled:opacity-50"
              >
                {createPhoneMutation.isPending ? "Saving..." : "Add Phone"}
              </button>
            </div>
          </form>

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
                  <div>
                    <p className="text-white text-[14px] md:text-[16px] font-medium">
                      {phone.phoneNumber}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        phone.isPrimary ? "bg-green-600" : "bg-gray-700"
                      }`}>
                        {phone.isPrimary ? "Primary" : "Secondary"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        phone.isVerified ? "bg-green-600" : "bg-gray-700"
                      }`}>
                        {phone.isVerified ? "Verified" : "Unverified"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        phone.isSmsCapable ? "bg-blue-600" : "bg-gray-700"
                      }`}>
                        {phone.isSmsCapable ? "SMS Capable" : "No SMS"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 md:mt-0">
                    <button
                      onClick={() => toggleField(phone, "isPrimary")}
                      className="px-3 py-1 text-sm rounded border light-border hover:bg-white hover:bg-opacity-5"
                    >
                      {phone.isPrimary ? "Unset Primary" : "Set Primary"}
                    </button>
                    <button
                      onClick={() => toggleField(phone, "isVerified")}
                      className="px-3 py-1 text-sm rounded border light-border hover:bg-white hover:bg-opacity-5"
                    >
                      {phone.isVerified ? "Mark Unverified" : "Mark Verified"}
                    </button>
                    <button
                      onClick={() => toggleField(phone, "isSmsCapable")}
                      className="px-3 py-1 text-sm rounded border light-border hover:bg-white hover:bg-opacity-5"
                    >
                      {phone.isSmsCapable ? "Disable SMS" : "Enable SMS"}
                    </button>
                    <button
                      onClick={() => handleDelete(phone)}
                      className="px-1 py-1 text-sm rounded border border-red-600 text-red-400 hover:bg-red-600 hover:text-white hover:bg-opacity-20"
                    >
                      <IoRemoveCircleOutline/>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneEditContainer;