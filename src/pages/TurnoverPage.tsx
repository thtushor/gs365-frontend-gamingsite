import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import axiosInstance from "../lib/api/axios";
import { API_ENDPOINTS } from "../lib/api/config";
import { toast } from "react-toastify";
import {
  FaFilter,
  FaChartLine,
  FaTrophy,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

interface TurnoverData {
  id: number;
  userId: number;
  transactionId: number;
  type: "default" | "bonus" | "promotion";
  status: "active" | "inactive" | "completed";
  bonusAmount: string;
  turnoverName: string;
  targetTurnover: string;
  depositAmount: string;
  remainingTurnover: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface TurnoverResponse {
  data: TurnoverData[];
  pagination: PaginationData;
}

const TurnoverPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"active" | "inactive" | "completed">("active");

  const [filters, setFilters] = useState({
    userId: user?.id?.toString() || "",
    status: "",
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (user?.id) {
      setFilters((prev) => ({
        ...prev,
        userId: user.id.toString(),
      }));
    }
  }, [user?.id]);

  const queryParams = new URLSearchParams();
  if (filters.userId) queryParams.append("userId", filters.userId);
  if (filters.status) queryParams.append("status", filters.status);
  queryParams.append("page", filters.page.toString());
  queryParams.append("pageSize", filters.pageSize.toString());

  const {
    data: turnoverData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["turnover", filters],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PAYMENT.TURNOVER}?${queryParams}`
      );
      return response.data?.data as TurnoverResponse;
    },
    enabled: !!filters.userId,
    staleTime: 5 * 60 * 1000,
  });

  const turnovers = turnoverData?.data || [];
  const pagination = turnoverData?.pagination || null;

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch turnover data");
    }
  }, [error]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "default":
        return "bg-blue-900 text-blue-300 border border-blue-700";
      case "bonus":
        return "bg-purple-900 text-purple-300 border border-purple-700";
      case "promotion":
        return "bg-orange-900 text-orange-300 border border-orange-700";
      default:
        return "bg-gray-900 text-gray-300 border border-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900 text-green-300 border border-green-700";
      case "completed":
        return "bg-blue-900 text-blue-300 border border-blue-700";
      case "inactive":
        return "bg-red-900 text-red-300 border border-red-700";
      default:
        return "bg-gray-900 text-gray-300 border border-gray-700";
    }
  };

  const calculateProgress = (target: string, remaining: string) => {
    const targetNum = parseFloat(target);
    const remainingNum = parseFloat(remaining);
    const completed = targetNum - remainingNum;
    return Math.min((completed / targetNum) * 100, 100);
  };

  const filteredTurnovers = turnovers.filter((t) => t.status === activeTab);

  const formatCurrency = (amount: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(parseFloat(amount));

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen second-bg py-6 px-3 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 mb-2">
          <FaChartLine className="text-3xl text-yellow-400" />
          <h1 className="text-xl sm:text-3xl font-bold text-white">Turnover Management</h1>
        </div>
        <p className="text-gray-300 text-sm sm:text-base">
          Track and manage your turnover targets and progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: "Total Turnovers",
            value: pagination?.total || 0,
            color: "blue",
            icon: <FaChartLine className="text-blue-400 text-lg sm:text-xl" />,
          },
          {
            title: "Active",
            value: turnovers.filter((t) => t.status === "active").length,
            color: "green",
            icon: <FaClock className="text-green-400 text-lg sm:text-xl" />,
          },
          {
            title: "Completed",
            value: turnovers.filter((t) => t.status === "completed").length,
            color: "blue",
            icon: <FaCheckCircle className="text-blue-400 text-lg sm:text-xl" />,
          },
          {
            title: "Total Target",
            value: formatCurrency(
              turnovers.reduce((sum, t) => sum + parseFloat(t.targetTurnover), 0).toString()
            ),
            color: "purple",
            icon: <FaTrophy className="text-purple-400 text-lg sm:text-xl" />,
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`light-bg rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-${card.color}-500`}
          >
            <div className="flex items-center justify-center sm:justify-start">
              <div className={`p-1 md:p-2 bg-${card.color}-900 rounded-lg`}>{card.icon}</div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-300">{card.title}</p>
                <p className="text-xs sm:text-2xl font-bold text-white">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="light-bg rounded-lg shadow-md mb-6 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FaChartLine className="text-yellow-400" />
          Your Turnover Summary
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm sm:text-2xl font-bold text-yellow-400">
              {formatCurrency(
                turnovers
                  .reduce((sum, t) => sum + parseFloat(t.targetTurnover), 0)
                  .toString()
              )}
            </p>
            <p className="text-xs sm:text-sm text-gray-300">Total Target</p>
          </div>
          <div>
            <p className="text-sm sm:text-2xl font-bold text-green-400">
              {formatCurrency(
                turnovers
                  .reduce((sum, t) => sum + parseFloat(t.remainingTurnover), 0)
                  .toString()
              )}
            </p>
            <p className="text-xs sm:text-sm text-gray-300">Total Remaining</p>
          </div>
          <div>
            <p className="text-sm sm:text-2xl font-bold text-blue-400">
              {formatCurrency(
                turnovers
                  .reduce(
                    (sum, t) =>
                      sum + (parseFloat(t.targetTurnover) - parseFloat(t.remainingTurnover)),
                    0
                  )
                  .toString()
              )}
            </p>
            <p className="text-xs sm:text-sm text-gray-300">Total Completed</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="light-bg rounded-lg shadow-md mb-6 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FaFilter className="text-yellow-400" />
          Filters
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs sm:text-sm text-gray-300 mb-1 block">User ID</label>
            <input
              type="text"
              value={filters.userId}
              disabled
              className="w-full px-3 py-2 second-bg border second-border rounded-md text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 second-bg border second-border rounded-md text-white text-sm"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="text-xs sm:text-sm text-gray-300 mb-1 block">Page Size</label>
            <select
              value={filters.pageSize}
              onChange={(e) => handleFilterChange("pageSize", parseInt(e.target.value))}
              className="w-full px-3 py-2 second-bg border second-border rounded-md text-white text-sm"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, status: "", page: 1 }))}
              className="w-full px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="light-bg rounded-lg shadow-md mb-6">
        <div className="flex justify-around border-b second-border">
          {["active", "inactive", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 sm:py-4 px-2 sm:px-4 font-medium text-xs sm:text-base w-full sm:w-auto border-b-2 ${
                activeTab === tab
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} (
              {turnovers.filter((t) => t.status === tab).length})
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
            </div>
          ) : filteredTurnovers.length === 0 ? (
            <div className="text-center py-10">
              <FaChartLine className="mx-auto h-10 w-10 text-gray-500" />
              <h3 className="text-sm font-medium text-white mt-2">No turnovers found</h3>
            </div>
          ) : (
            <div className="space-y-2 md:space-y-6">
              {filteredTurnovers.map((turnover, index) => (
                <div
                  key={index}
                  className="second-bg rounded-lg p-4 sm:p-6 border second-border"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-lg font-semibold text-white">
                        {turnover.turnoverName}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(turnover.type)}`}>
                        {turnover.type}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(turnover.status)}`}
                      >
                        {turnover.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-gray-300">
                      <div><span className="font-medium">User:</span> {turnover.userId}</div>
                      <div><span className="font-medium">Txn:</span> {turnover.transactionId || "N/A"}</div>
                      <div><span className="font-medium">Created:</span> {formatDate(turnover.createdAt)}</div>
                      <div><span className="font-medium">Updated:</span> {formatDate(turnover.updatedAt)}</div>
                    </div>

                    {/* Progress */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="text-gray-200">Progress</span>
                        <span className="text-gray-300">
                          {formatCurrency(
                            (
                              parseFloat(turnover.targetTurnover) -
                              parseFloat(turnover.remainingTurnover)
                            ).toString()
                          )}{" "}
                          / {formatCurrency(turnover.targetTurnover)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 sm:h-3 rounded-full"
                          style={{
                            width: `${calculateProgress(
                              turnover.targetTurnover,
                              turnover.remainingTurnover
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Amounts */}
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mt-3">
                      {turnover.type === "promotion" && turnover.bonusAmount ? (
                        <div className="light-bg p-3 rounded border second-border text-center">
                          <p className="text-xs text-gray-400 mb-1">Bonus</p>
                          <p className="text-xs sm:text-lg font-bold text-blue-400">
                            {formatCurrency(turnover.bonusAmount)}
                          </p>
                        </div>
                      ) : (
                        <div className="light-bg p-1 md:p-3 rounded border second-border text-center">
                          <p className="text-xs text-gray-400 mb-1">Deposit</p>
                          <p className="text-xs sm:text-lg font-bold text-blue-400">
                            {formatCurrency(turnover.depositAmount)}
                          </p>
                        </div>
                      )}
                      <div className="light-bg p-1 md:p-3 rounded border second-border text-center">
                        <p className="text-xs text-gray-400 mb-1">Target</p>
                        <p className="text-xs sm:text-lg font-bold text-blue-400">
                          {formatCurrency(turnover.targetTurnover)}
                        </p>
                      </div>
                      <div className="light-bg p-1 md:p-3 rounded border second-border text-center">
                        <p className="text-xs text-gray-400 mb-1">Remaining</p>
                        <p className="text-xs sm:text-lg font-bold text-orange-400">
                          {formatCurrency(turnover.remainingTurnover)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="light-bg rounded-lg shadow-md px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-300">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} results)
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-gray-700 rounded-md text-white disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-gray-700 rounded-md text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurnoverPage;
