import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import {
  User,
  Mail,
  BookOpen,
  Clock,
  Star,
  Image as ImageIcon,
  Save,
  X,
  Loader,
} from "lucide-react";
import { AuthContext } from "../Auth/AuthContext";

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    studyMode: "",
    experienceLevel: "",
    profileimage: "",
    rating: 0,
  });

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://study-mate-server-six.vercel.app/profileDetails/${id}`
        );
        const data = await response.json();

        if (data.success && data.result) {
          setFormData({
            name: data.result.name || "",
            email: data.result.email || "",
            subject: data.result.subject || "",
            studyMode: data.result.studyMode || "",
            experienceLevel: data.result.experienceLevel || "",
            profileimage: data.result.profileimage || "",
            rating: data.result.rating || 0,
          });
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await fetch(
        `https://study-mate-server-six.vercel.app/updateProfile/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Profile updated successfully!");
        navigate("/my-profiles");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate("/my-profiles");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate("/my-profiles")}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 py-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-slide-down">
            Update Profile
          </h1>
          <p className="text-gray-600 animate-slide-up">
            Modify your study partner profile information
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Preview */}
            {formData.profileimage && (
              <div className="flex justify-center mb-6 animate-fade-in">
                <div className="relative group">
                  <img
                    src={formData.profileimage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              </div>
            )}

            {/* Name Field */}
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User size={18} className="text-gray-600" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 transition-all duration-300 outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail size={18} className="text-gray-600" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 transition-all duration-300 outline-none bg-gray-50"
                placeholder="Enter your email"
                disabled
              />
            </div>

            {/* Subject Field */}
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <BookOpen size={18} className="text-gray-600" />
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 transition-all duration-300 outline-none cursor-pointer"
              >
                <option value="">Select a subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Economics">Economics</option>
              </select>
            </div>

            {/* Study Mode Field */}
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Clock size={18} className="text-gray-600" />
                Study Mode
              </label>
              <select
                name="studyMode"
                value={formData.studyMode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 transition-all duration-300 outline-none cursor-pointer"
              >
                <option value="">Select study mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Experience Level Field */}
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Star size={18} className="text-gray-600" />
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 transition-all duration-300 outline-none cursor-pointer"
              >
                <option value="">Select experience level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Profile Image URL Field */}
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <ImageIcon size={18} className="text-gray-600" />
                Profile Image URL
              </label>
              <input
                type="url"
                name="profileimage"
                value={formData.profileimage}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 transition-all duration-300 outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-gray-600 to-black text-white py-3 px-6 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {updating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Update Profile
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={updating}
                className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UpdateProfile;
