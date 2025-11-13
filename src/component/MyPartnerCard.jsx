import React, { useState } from "react";
import {
  ChevronRight,
  Star,
  Clock,
  BookOpen,
  Edit,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const MyPartnerCard = ({ partner }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleViewProfile = () => {
    console.log("Navigating to ID:", partner._id);
    navigate(`/profileDetails/${partner._id}`);
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    navigate(`/update-partner/${partner._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/deleteProfile/${partner._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Profile deleted successfully!");
        // Reload the page or trigger parent component refresh
        window.location.reload();
      } else {
        alert("Failed to delete profile. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("An error occurred while deleting the profile.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
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
      className="relative card bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-gray-300 rounded-xl overflow-hidden animate-fade-in cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProfile}
    >
      {/* Subtle Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>

      {/* Action Buttons - Top Right */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          title="Update"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>

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
                  "https://placehold.co/80x80?text=Profile&font=roboto";
              }
            }}
          />
          {/* Pulsing Ring on Hover */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gray-500 group-hover:animate-ping opacity-0 group-hover:opacity-75"></div>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-6 relative z-10">
        {/* Name with Subtle Animation - Centered */}
        <h2 className="card-title text-2xl font-bold text-gray-800 mb-3 transition-transform duration-300 text-center group-hover:scale-110 group-hover:text-gray-900 mx-auto">
          {partner.name}
        </h2>

        {/* Subject with Icon - Left-aligned */}
        <div className="flex items-center justify-start gap-2 mb-3 pl-2">
          <BookOpen size={18} className="text-gray-600 flex-shrink-0" />
          <p className="text-sm text-gray-700 font-medium text-left">
            Subject:{" "}
            <span className="text-gray-900 font-semibold">
              {partner.subject}
            </span>
          </p>
        </div>

        {/* Study Mode with Icon - Left-aligned */}
        <div className="flex items-center justify-start gap-2 mb-3 pl-2">
          <Clock size={18} className="text-gray-600 flex-shrink-0" />
          <p className="text-sm text-gray-700 font-medium text-left">
            Mode:{" "}
            <span className="text-gray-900 font-semibold">
              {partner.studyMode}
            </span>
          </p>
        </div>

        {/* Experience Level with Progress Bar and Icon - Left-aligned */}
        <div className="mb-4 pl-2">
          <div className="flex items-center justify-start gap-2 mb-2">
            <Star size={18} className="text-gray-600 flex-shrink-0" />
            <p className="text-sm text-gray-700 font-medium text-left">
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

        {/* View Profile Button - Centered */}
        <div className="card-actions justify-center">
          <button
            className="relative btn bg-gradient-to-r from-gray-600 to-black text-white hover:from-gray-700 hover:to-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/50 hover:scale-110 rounded-lg px-6 py-3 flex items-center gap-2 overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
          >
            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></span>
            <Link to={`/profileDetails/${partner._id}`}>View Profile</Link>
          </button>
        </div>
      </div>

      {/* Animated Dot Indicator */}
      {isHovered && (
        <div className="absolute top-4 left-4 w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-50"></div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg p-6 shadow-2xl max-w-sm mx-4 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this partner profile? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPartnerCard;
