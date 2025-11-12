import React, { useState } from "react";
import { ChevronRight, Star, Clock, BookOpen } from "lucide-react"; 
import { Link, useNavigate } from "react-router";

const PartnerCard = ({ partner }) => {

  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleViewProfile = () => {
    navigate(`/profileDetails/${partner._id}`);
  };
  const getExperienceProgress = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return 25;
      case "intermediate":
        return 50;
      case "advanced":
        return 75;
      case "expert":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div
      className="relative card bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1 border border-gray-300 rounded-xl overflow-hidden animate-fade-in cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProfile}
    >
      {/* Subtle Gradient Overlay on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`}
      ></div>

      {/* Profile Image with Glow Effect */}
      <figure className="flex justify-center pt-8 pb-4 relative">
        <div className="relative">
          <img
            src={
              partner.profileimage ||
              "https://placehold.co/80x80?text=Profile&font=roboto"
            } 
            alt={partner.name}
            className="rounded-full w-40 h-40 object-cover"
            onError={(e) => {
              if (!imageError) {
                setImageError(true);
                e.target.src =
                  "https://placehold.co/80x80?text=Profile&font=roboto"; // Fixed fallback URL
              }
            }}
          />
          {/* Pulsing Ring on Hover */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-500 group-hover:animate-ping opacity-0 group-hover:opacity-75"></div>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-6 text-center relative z-10">
        {/* Name with Subtle Animation */}
        <h2 className="card-title text-2xl font-bold text-gray-800 mb-3 transition-transform duration-300 text-center group-hover:scale-110 group-hover:text-gray-900">
          {partner.name}
        </h2>

        {/* Subject with Icon */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <BookOpen size={18} className="text-gray-600" />
          <p className="text-sm text-gray-700 font-medium">
            Subject:{" "}
            <span className="text-gray-900 font-semibold">
              {partner.subject}
            </span>
          </p>
        </div>

        {/* Study Mode with Icon */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock size={18} className="text-gray-600" />
          <p className="text-sm text-gray-700 font-medium">
            Mode:{" "}
            <span className="text-gray-900 font-semibold">
              {partner.studyMode}
            </span>
          </p>
        </div>

        {/* Experience Level with Progress Bar and Icon */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star size={18} className="text-gray-600" />
            <p className="text-sm text-gray-700 font-medium">
              Level:{" "}
              <span className="text-gray-900 font-semibold">
                {partner.experienceLevel}
              </span>
            </p>
          </div>
          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-gray-600 to-black h-full transition-all duration-700 ease-out"
              style={{
                width: `${getExperienceProgress(partner.experienceLevel)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* View Profile Button with Ripple Effect */}
        <div className="card-actions justify-center">
          <button
            className="relative btn bg-gradient-to-r from-gray-600 to-black text-white hover:from-gray-700 hover:to-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/50 hover:scale-110 rounded-lg px-6 py-3 flex items-center gap-2 overflow-hidden"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              handleViewProfile();
            }}
          >
            {/* Ripple Effect */}
            <Link to={`/profileDetails/${partner._id}`}>
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></span>
              View Profile
            </Link>
          </button>
        </div>
      </div>
      {isHovered && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-50"></div>
      )}
    </div>
  );
};

export default PartnerCard;
