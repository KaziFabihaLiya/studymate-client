import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Users } from "lucide-react";
import { useLoaderData } from "react-router";
import PartnerCard from "./PartnerCard";


const PartnerProfiles = () => {
  const data = useLoaderData();
  console.log(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-100 to-base-200">
        <div className="skeleton animate-pulse">Loading partners...</div>
      </div>
    );
  }

  return (
    <div className="mt-40 min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-base-content flex items-center justify-center gap-2">
          <Users size={32} /> Our Partners
        </h1>
        {data.length === 0 ? (
          <p className="text-center text-base-content/50">No partners found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((partner) => (
              
              <PartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerProfiles;
