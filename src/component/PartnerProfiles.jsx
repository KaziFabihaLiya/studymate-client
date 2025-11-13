import React, { useState, useEffect } from "react";
import { Users, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useLoaderData } from "react-router";
import PartnerCard from "./PartnerCard";

const PartnerProfiles = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filteredData, setFilteredData] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFilteredData(data);
      setLoading(false);
    }
  }, [data]);

  // Filter and sort partners
  useEffect(() => {
    let result = data.filter((partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by rating
    if (sortOrder === "asc") {
      result = result.sort((a, b) => a.rating - b.rating);
    } else {
      result = result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredData(result);
  }, [searchTerm, sortOrder, data]);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowSortMenu(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
          <Sparkles
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 animate-pulse"
            size={24}
          />
        </div>
        <p className="mt-6 text-gray-600 font-medium animate-pulse">
          Loading amazing partners...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-gray-600 to-gray-900 rounded-2xl mb-6 shadow-lg animate-float">
            <Users size={32} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Study Partners
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with talented individuals and find your perfect study
            companion
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-1 w-20 bg-linear-to-r from-transparent via-gray-600 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-slide-up">
          {/* Sort Button - Left Side */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="w-full sm:w-auto flex items-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <SlidersHorizontal
                size={20}
                className="text-gray-600 group-hover:rotate-90 transition-transform duration-300"
              />
              <span className="font-medium text-gray-700">
                {sortOrder === "asc" ? "Low to High" : "High to Low"}
              </span>
              <div
                className={`ml-2 transition-transform duration-300 ${
                  showSortMenu ? "rotate-180" : ""
                }`}
              >
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="text-gray-600"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* Sort Dropdown Menu */}
            {showSortMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-dropdown">
                <div className="p-2">
                  <button
                    onClick={() => handleSortChange("desc")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      sortOrder === "desc"
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="font-medium">High to Low</div>
                    <div className="text-xs opacity-75 mt-0.5">
                      Best rated first
                    </div>
                  </button>
                  <button
                    onClick={() => handleSortChange("asc")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 mt-1 ${
                      sortOrder === "asc"
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="font-medium">Low to High</div>
                    <div className="text-xs opacity-75 mt-0.5">
                      Lowest rated first
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Input - Right Side */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search partners by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full px-6 py-3.5 pr-14 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 outline-none ${
                isSearchFocused
                  ? "border-gray-900 shadow-lg shadow-gray-200"
                  : "border-gray-200 shadow-sm hover:border-gray-400"
              }`}
            />
            <div
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                isSearchFocused ? "text-gray-900 scale-110" : "text-gray-400"
              }`}
            >
              <Search size={20} />
            </div>

            {/* Search highlight line */}
            <div
              className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-gray-600 to-gray-900 transition-all duration-300 ${
                isSearchFocused ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between animate-fade-in">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredData.length}
            </span>{" "}
            {filteredData.length === 1 ? "partner" : "partners"} found
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Partner Cards Grid */}
        {filteredData.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No partners found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger">
            {filteredData.map((partner, index) => (
              <div
                key={partner._id}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                className="animate-fade-in-up"
              >
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-dropdown {
          animation: dropdown 0.3s ease-out;
        }

        .animate-stagger > * {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default PartnerProfiles;
