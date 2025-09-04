import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { useTransactions } from "../lib/api/hooks";
import Pagination from "../lib/utils/Pagination";

const statusOptions = [
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

const defaultFilters = {
  page: 1,
  pageSize: 20,
  type: "",
  status: "",
  search: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  userId: "",
  historyType: "user",
};

export const formatAmount = (amount) => {
  if (!amount || amount === "0.00") return "-";
  return `${parseFloat(amount).toFixed(2)} BDT`;
};
const TransactionHistory = ({ title = "Transaction History" }) => {
  const { user } = useAuth();
  const playerId = user?.id;

  const [filters, setFilters] = useState({
    ...defaultFilters,
    userId: playerId || "",
  });

  const navigate = useNavigate();

  // Update filters when playerId changes
  useEffect(() => {
    if (playerId) {
      setFilters((prev) => ({
        ...prev,
        userId: playerId,
        page: 1,
      }));
    }
  }, [playerId]);

  const { data, isLoading } = useTransactions(filters);

  const items = data?.data || [];
  const pagination = data?.pagination || {};
  const total = pagination.total || 0;
  const page = filters.page;
  const pageSize = filters.pageSize;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const formatDateTime = (iso) => {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    } catch {
      return iso;
    }
  };

  return (
    <div className="bg-[#121212] w-full max-w-[1200px] mx-auto min-h-full p-4">
      <h2 className="text-lg font-semibold mb-4 text-left border-l-[3px] pl-2 border-yellow-300">
        {title}
      </h2>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg shadow p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            className="border rounded px-3 py-2"
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value, page: 1 }))
            }
          >
            <option value="">All Status</option>
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({ ...f, type: e.target.value, page: 1 }))
            }
          >
            <option value="">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#121212] border border-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-200">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Bonus Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No transactions found
                  </td>
                </tr>
              ) : (
                items.map((row, index) => (
                  <tr key={row.id} className="border-t border-gray-700">
                    <td className="px-4 py-2">
                      {(page - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 py-2">{row.id}</td>
                    <td className="px-4 py-2">
                      {row.givenTransactionId || row.customTransactionId || "-"}
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-green-500 hover:text-green-700 font-medium hover:underline">
                        {row.userFullname}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-white/70 text-black px-2 py-[2px] rounded-full capitalize font-medium hover:underline">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-medium">
                      {row.amount != null ? formatAmount(row.amount) : "-"}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {row.bonusAmount != null
                            ? formatAmount(row.bonusAmount)
                            : "-"}
                        </span>
                        <span className="font-medium text-gray-400 text-xs">
                          {row?.promotionName
                            ? `Promotion: ${row.promotionName}`
                            : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs capitalize font-medium ${
                          row.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : row.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {formatDateTime(row.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
          onPageSizeChange={(ps) =>
            setFilters((f) => ({ ...f, pageSize: ps, page: 1 }))
          }
        />
      </div>
    </div>
  );
};

export default TransactionHistory;
