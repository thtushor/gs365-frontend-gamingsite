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
  const [activeTab, setActiveTab] = useState<
    "active" | "inactive" | "completed"
  >("active");

  // Filter states
  const [filters, setFilters] = useState({
    userId: user?.id?.toString() || "",
    status: "",
    page: 1,
    pageSize: 10,
  });

  // Update filters when user changes
  useEffect(() => {
    if (user?.id) {
      setFilters((prev) => ({
        ...prev,
        userId: user.id.toString(),
      }));
    }
  }, [user?.id]);

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (filters.userId) queryParams.append("userId", filters.userId);
  if (filters.status) queryParams.append("status", filters.status);
  queryParams.append("page", filters.page.toString());
  queryParams.append("pageSize", filters.pageSize.toString());

  // React Query for fetching turnovers
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
    enabled: !!filters.userId, // Only run query when we have a userId
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Extract data from query result
  const turnovers = turnoverData?.data || [];
  const pagination = turnoverData?.pagination || null;

  console.log({ turnoverData });

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch turnover data");
    }
  }, [error]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <FaClock className="text-blue-400" />;
      case "completed":
        return <FaCheckCircle className="text-green-400" />;
      case "inactive":
        return <FaTimesCircle className="text-red-400" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  console.log({ getStatusIcon });

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

  const filteredTurnovers = turnovers.filter((turnover) => {
    if (activeTab === "active") return turnover.status === "active";
    if (activeTab === "inactive") return turnover.status === "inactive";
    if (activeTab === "completed") return turnover.status === "completed";
    return true;
  });

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen second-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaChartLine className="text-3xl text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">
              Turnover Management
            </h1>
          </div>
          <p className="text-gray-300">
            Track and manage your turnover targets and progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="light-bg rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-900 rounded-lg">
                <FaChartLine className="text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">
                  Total Turnovers
                </p>
                <p className="text-2xl font-bold text-white">
                  {pagination?.total || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="light-bg rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-900 rounded-lg">
                <FaClock className="text-green-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Active</p>
                <p className="text-2xl font-bold text-white">
                  {turnovers.filter((t) => t.status === "active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="light-bg rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-900 rounded-lg">
                <FaCheckCircle className="text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Completed</p>
                <p className="text-2xl font-bold text-white">
                  {turnovers.filter((t) => t.status === "completed").length}
                </p>
              </div>
            </div>
          </div>

          <div className="light-bg rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-2 bg-purple-900 rounded-lg">
                <FaTrophy className="text-purple-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">
                  Total Target
                </p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(
                    turnovers
                      .reduce((sum, t) => sum + parseFloat(t.targetTurnover), 0)
                      .toString()
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Turnover Summary */}
        <div className="light-bg rounded-lg shadow-lg mb-6 p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <FaChartLine className="text-yellow-400" />
            Your Turnover Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {formatCurrency(
                  turnovers
                    .reduce((sum, t) => sum + parseFloat(t.targetTurnover), 0)
                    .toString()
                )}
              </p>
              <p className="text-sm text-gray-300">Total Target Amount</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(
                  turnovers
                    .reduce(
                      (sum, t) => sum + parseFloat(t.remainingTurnover),
                      0
                    )
                    .toString()
                )}
              </p>
              <p className="text-sm text-gray-300">Total Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {formatCurrency(
                  turnovers
                    .reduce(
                      (sum, t) =>
                        sum +
                        (parseFloat(t.targetTurnover) -
                          parseFloat(t.remainingTurnover)),
                      0
                    )
                    .toString()
                )}
              </p>
              <p className="text-sm text-gray-300">Total Completed</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="light-bg rounded-lg shadow-lg mb-6">
          <div className="p-6 second-border border-b">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FaFilter className="text-yellow-400" />
              Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  User ID
                </label>
                <input
                  type="text"
                  placeholder="Filter by User ID"
                  value={filters.userId}
                  onChange={(e) => handleFilterChange("userId", e.target.value)}
                  className="w-full px-3 py-2 second-bg border second-border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Auto-filled from your account
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-3 py-2 second-bg border second-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Page Size
                </label>
                <select
                  value={filters.pageSize}
                  onChange={(e) =>
                    handleFilterChange("pageSize", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 second-bg border second-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>

              <div className="flex items-center mt-[7px]">
                <button
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      status: "",
                      page: 1,
                    }));
                  }}
                  className="w-full px-4 py-[7px] bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="light-bg rounded-lg shadow-lg mb-6">
          <div className="border-b second-border">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                {
                  key: "active",
                  label: "Active",
                  count: turnovers.filter((t) => t.status === "active").length,
                },
                {
                  key: "inactive",
                  label: "Inactive",
                  count: turnovers.filter((t) => t.status === "inactive")
                    .length,
                },
                {
                  key: "completed",
                  label: "Completed",
                  count: turnovers.filter((t) => t.status === "completed")
                    .length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(tab.key as "active" | "inactive" | "completed")
                  }
                  className={`py-4 px-1 border-b-2 !w-full max-w-[220px] mt-5 font-medium text-sm ${
                    activeTab === tab.key
                      ? "border-yellow-400 text-yellow-400"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${
                      activeTab === tab.key
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            ) : filteredTurnovers.length === 0 ? (
              <div className="text-center py-12">
                <FaChartLine className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-2 text-sm font-medium text-white">
                  No turnovers found
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  No turnovers match your current filters.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTurnovers.map((turnover, index) => (
                  <div
                    key={index}
                    className="second-bg rounded-lg p-6 border second-border"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {turnover.turnoverName}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                              turnover.type
                            )}`}
                          >
                            {turnover.type}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              turnover.status
                            )}`}
                          >
                            {turnover.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 mb-4">
                          <div>
                            <span className="font-medium">User ID:</span>{" "}
                            {turnover.userId}
                          </div>
                          <div>
                            <span className="font-medium">Transaction ID:</span>{" "}
                            {turnover.transactionId || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span>{" "}
                            {formatDate(turnover.createdAt)}
                          </div>
                          <div>
                            <span className="font-medium">Updated:</span>{" "}
                            {formatDate(turnover.updatedAt)}
                          </div>
                        </div>

                        {/* Progress Section */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-200">
                              Progress
                            </span>
                            <span className="text-sm text-gray-300">
                              {formatCurrency(
                                (
                                  parseFloat(turnover.targetTurnover) -
                                  parseFloat(turnover.remainingTurnover)
                                ).toString()
                              )}{" "}
                              / {formatCurrency(turnover.targetTurnover)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-yellow-400 to-green-400 h-3 rounded-full transition-all duration-300"
                              style={{
                                width: `${calculateProgress(
                                  turnover.targetTurnover,
                                  turnover.remainingTurnover
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>0%</span>
                            <span>
                              {calculateProgress(
                                turnover.targetTurnover,
                                turnover.remainingTurnover
                              ).toFixed(1)}
                              %
                            </span>
                            <span>100%</span>
                          </div>
                        </div>

                        {/* Amount Details */}
                        <div className="grid grid-cols-3 gap-4">
                          {turnover.type === "promotion" &&
                          turnover.bonusAmount ? (
                            <div className="light-bg p-3 rounded border second-border">
                              <p className="text-xs text-gray-400 mb-1">
                                Bonus
                              </p>
                              <p className="text-lg font-bold text-blue-400">
                                {formatCurrency(turnover.bonusAmount)}
                              </p>
                            </div>
                          ) : (
                            <div className="light-bg p-3 rounded border second-border">
                              <p className="text-xs text-gray-400 mb-1">
                                Deposit
                              </p>
                              <p className="text-lg font-bold text-blue-400">
                                {formatCurrency(turnover.depositAmount)}
                              </p>
                            </div>
                          )}
                          <div className="light-bg p-3 rounded border second-border">
                            <p className="text-xs text-gray-400 mb-1">
                              Target Turnover
                            </p>
                            <p className="text-lg font-bold text-blue-400">
                              {formatCurrency(turnover.targetTurnover)}
                            </p>
                          </div>
                          <div className="light-bg p-3 rounded border second-border">
                            <p className="text-xs text-gray-400 mb-1">
                              Remaining
                            </p>
                            <p className="text-lg font-bold text-orange-400">
                              {formatCurrency(turnover.remainingTurnover)}
                            </p>
                          </div>
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
          <div className="light-bg rounded-lg shadow-lg px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300">
                Showing page {pagination.page} of {pagination.totalPages}(
                {pagination.total} total results)
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 border second-border rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 border second-border rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TurnoverPage;
