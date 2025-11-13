import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Users, Search } from "lucide-react";
import { useLoaderData } from "react-router";
import PartnerCard from "./PartnerCard";

const PartnerProfiles = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFilteredData(data);
      setLoading(false);
    }
  }, [data]);

  // Filter partners by search input
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-gray-300 animate-pulse">Loading partners...</div>
      </div>
    );
  }

  return (
    <div className="mt-40 min-h-screen bg-white text-gray-100 p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3 text-gray-900">
          <Users size={32} /> Our Partners
        </h1>

        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-2/3 text-gray-900">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-5 py-3 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            >
              <option className="" value="asc">Sort by Rating (Low → High)</option>
              <option value="desc">Sort by Rating (High → Low)</option>
            </select>
          </div>
        </div>

        {/* Partner Cards */}
        {filteredData.length === 0 ? (
          <p className="text-center text-gray-400">No partners found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerProfiles;
