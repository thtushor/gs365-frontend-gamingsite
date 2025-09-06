import { useState } from "react";
import { useBetResults } from "../lib/api/hooks";
import { useNavigate } from "react-router-dom";
import Pagination from "../lib/utils/Pagination";
import { useAuth } from "../contexts/auth-context";
import StatusChip from "../lib/utils/StatusChip";

export const formatAmount = (amount) => {
  if (!amount || amount === "0.00") return "-";
  return `${parseFloat(amount).toFixed(2)} BDT`;
};

const BettingHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate last 7 days
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [filters, setFilters] = useState({
    userId: user?.id || "",
    gameId: "",
    betStatus: "",
    playingStatus: "",
    dateFrom: sevenDaysAgo.toISOString(),
    dateTo: today.toISOString(),
    minBetAmount: "",
    maxBetAmount: "",
    gameName: "",
    providerName: "",
    isMobile: "",
    limit: 50,
    offset: 0,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const {
    data: betResults,
    isLoading,
    error,
  } = useBetResults({
    ...filters,
    page: currentPage,
    pageSize,
  });

  const betResultsList = betResults?.data || [];
  const pagination = betResults?.pagination || {};

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setFilters((prev) => ({ ...prev, offset: (page - 1) * pageSize }));
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, limit: size, offset: 0 }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
  };

  const getBetStatusColor = (status) => {
    console.log(status);
    switch (status) {
      case "win":
        return "success";
      case "loss":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getPlayingStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "playing":
        return "warning";
      case "abandoned":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-[#121212]  w-full max-w-[1200px] mx-auto min-h-full p-4">
      <h2 className="text-lg font-semibold mb-4 text-left border-l-[3px] pl-2 border-yellow-300">
        Betting History
      </h2>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        {error && (
          <div className="p-4 text-center text-red-600">
            Error loading bet results: {error.message}
          </div>
        )}

        <div className="border overflow-hidden rounded-[10px] border-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Game
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Provider Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bet Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bet Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Win Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Loss Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Multiplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Balance at Bet End
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Current Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bet Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Playing Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Bet Placed At
                  </th>
                </tr>
              </thead>

              <tbody className="bg-[#121212] divide-y divide-gray-800">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="14"
                      className="px-6 py-4 text-center text-gray-300"
                    >
                      Loading bet results...
                    </td>
                  </tr>
                ) : betResultsList.length === 0 ? (
                  <tr>
                    <td
                      colSpan="14"
                      className="px-6 py-4 text-center text-gray-300"
                    >
                      No bet results found
                    </td>
                  </tr>
                ) : (
                  betResultsList.map((bet) => (
                    <tr key={bet.id} className={``}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {bet.gameDetails?.name ||
                          bet.gameName ||
                          "Unknown Game"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-medium">
                        {bet.providerDetails?.name || "Unknown Provider"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatAmount(bet.betBalance)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatAmount(bet.betAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {formatAmount(bet.winAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        {formatAmount(bet.lossAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {bet.multiplier}x
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatAmount(
                          Number(bet.betBalance) +
                            Number(bet.winAmount) -
                            Number(bet.lossAmount)
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatAmount(bet.userBalance?.currentBalance || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusChip
                          status={bet.betStatus}
                          variant={getBetStatusColor(bet.betStatus)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusChip
                          status={bet.playingStatus}
                          variant={getPlayingStatusColor(bet.playingStatus)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(bet.betPlacedAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {pagination && pagination.totalPages > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            pageSize={pageSize}
            pageSizeOptions={[10, 25, 50, 100]}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </div>
  );
};

export default BettingHistory;
