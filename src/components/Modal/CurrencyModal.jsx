import React, { useState, useMemo } from "react";
import { useAuth } from "../../contexts/auth-context";

export const CurrencyModal = ({ isOpen, onClose, onChange, value }) => {
  const { countries, selectedCurrency, setSelectedCurrency } = useAuth();
  const [search, setSearch] = useState("");

  // Filter countries by search term
  const filteredCountries = useMemo(() => {
    if (!search) return countries;
    return countries.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-[3px]">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl top-0 left-0 animate-float" />
        <div className="absolute w-60 h-60 bg-green-300/20 rounded-full blur-2xl bottom-0 right-0 animate-float2" />
      </div>

      <div className="relative w-full max-w-lg mx-4 rounded-3xl shadow-2xl border border-green-200 bg-white/70 backdrop-blur-2xl animate-currencyModalIn overflow-hidden">
        {/* Header */}
        <div className="relative flex flex-col gap-2 px-4 md:px-8 py-2 md:py-5 bg-gradient-to-r from-green-600 via-green-500 to-green-400 rounded-t-3xl shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold md:font-bold text-[18px] md:text-xl tracking-wide drop-shadow">
              Currency & Language
            </h3>
            <div
              onClick={onClose}
              className="text-white cursor-pointer select-none !w-[30px] !h-[30px] md:w-[50px] md:h-[50px] text-2xl font-bold rounded-full bg-white/10 hover:bg-green-800/80 hover:scale-110 transition flex items-center justify-center shadow-lg backdrop-blur-md border border-white/30"
            >
              <span className="inline-block transition-transform hover:rotate-90 duration-300">
                &times;
              </span>
            </div>
          </div>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-800"
          />
        </div>

        {/* List */}
        <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
          {filteredCountries.length === 0 ? (
            <p className="text-center text-gray-500">No countries found.</p>
          ) : (
            <ul className="space-y-2 md:space-y-5">
              {filteredCountries.map((country) => (
                <li
                  key={country.id}
                  className="flex items-center justify-between bg-white/80 rounded-2xl shadow-md border border-gray-100 px-3 pr-4 py-3 md:px-4 md:py-3 group transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-green-100/80"
                >
                  <div className="flex items-center gap-3 min-w-[110px]">
                    <img
                      src={`data:image/png;base64,${country?.flagUrl}`}
                      alt={country?.name}
                      className="w-10 h-10 rounded-full shadow border-2 border-green-100 group-hover:border-green-400 transition"
                    />
                    <div className="font-bold flex flex-col text-[12px] md:text-base items-start">
                      <span className="text-[14px] text-gray-900">
                        {country?.currency?.symbol}
                      </span>
                      <span className="text-gray-700">
                        {country?.currency?.code}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap justify-end">
                    {country.languages.map((lang) => {
                      const selected =
                        selectedCurrency?.currency ===
                          country?.currency?.code &&
                        selectedCurrency?.language === lang?.code;

                      return (
                        <label
                          key={lang.id}
                          className="cursor-pointer relative"
                        >
                          <input
                            type="radio"
                            name={`lang-${country?.currency?.code}`}
                            checked={selected}
                            onChange={() =>
                              setSelectedCurrency({
                                currency: country?.currency?.code || "N/A",
                                language: lang?.code || "N/A",
                                country,
                              })
                            }
                            className="hidden"
                          />
                          <span
                            className={`relative px-[10px] md:px-4 py-0.5 md:py-1.5 rounded-full text-[12px] md:text-sm font-semibold shadow transition-all border-2 flex items-center gap-1 ${
                              selected
                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-500 scale-110 ring-2 ring-green-300 animate-pulse"
                                : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-green-100 hover:scale-105"
                            }`}
                            style={{
                              boxShadow: selected
                                ? "0 2px 12px 0 rgba(34,197,94,0.18), 0 0px 0px 2px #22c55e33"
                                : "",
                            }}
                          >
                            {lang?.name || "N/A"}
                            {selected && (
                              <span className="ml-1 flex items-center justify-center animate-pop">
                                <svg
                                  className="w-4 h-4 text-white drop-shadow"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            )}
                          </span>
                          <span className="absolute inset-0 rounded-full pointer-events-none group-hover:animate-shinePill" />
                        </label>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes currencyModalIn { 0% { opacity: 0; transform: scale(0.95);} 100% { opacity: 1; transform: scale(1);} }
          .animate-currencyModalIn { animation: currencyModalIn 0.35s cubic-bezier(.4,0,.2,1); }
          @keyframes float { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-20px);} }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float2 { animation: float 8s ease-in-out infinite; }
          @keyframes pop { 0% { transform: scale(0.5);} 80% { transform: scale(1.2);} 100% { transform: scale(1);} }
          .animate-pop { animation: pop 0.3s cubic-bezier(.4,0,.2,1); }
          @keyframes shinePill { 0% { background: none;} 50% { background: linear-gradient(90deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.08) 100%);} 100% { background: none;} }
          .group-hover\\:animate-shinePill:hover .group-hover\\:animate-shinePill { animation: shinePill 0.7s; }
        `}
      </style>
    </div>
  );
};
