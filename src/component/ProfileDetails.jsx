import React, { useState, useEffect, useContext } from "react";
import {
  Star,
  Clock,
  BookOpen,
  Award,
  Users,
  Mail,
  Video,
  TrendingUp,
  Heart,
  Share2,
  ChevronLeft,
  CheckCircle,
  Zap,
  Target,
  Globe,
  LocateIcon,
  UserPlus,
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const ProfileDetails = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);
  const [partnerCount, setPartnerCount] = useState(0);
  const navigate = useNavigate();
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  const partner = data?.result;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsVisible(true);
    if (partner) {
      setPartnerCount(partner.partnerCount || 0);
    }
  }, [user, navigate, partner]);

  const handleSendPartnerRequest = async () => {
    if (!user || !user.email) {
      toast.error("Please login to send partner request");
      return;
    }

    // Check if user is trying to send request to their own profile
    if (partner.email === user.email) {
      toast.error("You cannot send a request to your own profile");
      return;
    }

    setIsRequestSending(true);

    // Validate and log partnerId
    console.log("Frontend - Sending partnerId:", partner._id, {
      type: typeof partner._id,
      length: partner._id?.length,
      startsWith: partner._id?.slice(0, 6),
      isHex: /^[0-9a-fA-F]{24}$/.test(partner._id || ""),
    });

    if (
      !partner._id ||
      typeof partner._id !== "string" ||
      partner._id.length !== 24 ||
      !/^[0-9a-fA-F]{24}$/.test(partner._id)
    ) {
      console.error("Invalid partner ID detected - aborting");
      toast.error("Invalid profile ID. Please refresh the page and try again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/sendPartnerRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partnerId: partner._id,
          userEmail: user.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update local partner count
        setPartnerCount((prev) => prev + 1);
        toast.success("Partner request sent successfully! 🎉", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
            fontWeight: "600",
          },
          icon: "✅",
        });
      } else {
        toast.error(result.message || "Failed to send partner request", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error sending partner request:", error);
      toast.error("An error occurred. Please try again later.", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsRequestSending(false);
    }
  };
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${partner?.name} - Study Partner`,
        text: `Check out ${partner?.name}'s profile on StudyMate!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={`transition-all duration-300 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-bold text-gray-900">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (!data?.success || !partner) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The study partner profile you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 mt-20 bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Toast Container */}
      <Toaster />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Glassmorphic Navigation Bar */}
      <div className="sticky top-0 z-50 mx-auto max-w-5xl mt-6 px-4">
        <div className="rounded-full bg-white/25 backdrop-blur-xl border border-white/30 shadow-lg px-6 py-3 flex items-center justify-between transition-all duration-300 hover:bg-white/30">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
          >
            <ChevronLeft
              size={24}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-semibold">Back to Partners</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFavorite}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isFavorited
                  ? "bg-red-100/60 text-red-600"
                  : "bg-white/40 text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <Heart size={20} className={isFavorited ? "fill-current" : ""} />
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-white/40 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-110"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div
              className={`bg-white rounded-3xl shadow-xl overflow-hidden sticky top-24 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Profile Image */}
              <div className="relative h-80 bg-linear-to-br from-blue-500 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <img
                  src={partner.profileimage}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />

                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-lg animate-bounce-slow">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-900">
                    Available
                  </span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 bg-linear-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2 text-white">
                    <Award size={20} />
                    <span className="font-bold">{partner.experienceLevel}</span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h1>

                {/* Rating */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    {renderStars(partner.rating)}
                    <span className="text-sm text-gray-500">
                      ({partnerCount} partners)
                    </span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <BookOpen size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Subject
                      </p>
                      <p className="font-semibold text-gray-900">
                        {partner.subject}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Video size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Study Mode
                      </p>
                      <p className="font-semibold text-gray-900">
                        {partner.studyMode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <LocateIcon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Location
                      </p>
                      <p className="font-semibold text-gray-900">
                        {partner.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-auto h-10 bg-blue-50 rounded-xl px-2.5 flex items-center justify-center">
                      <Clock size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Availability
                      </p>
                      <p className="font-semibold text-gray-900">
                        {partner.availability}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Send Partner Request Button */}
                <button
                  onClick={handleSendPartnerRequest}
                  disabled={isRequestSending}
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isRequestSending ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus
                        size={24}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span>Send Partner Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div
              className="bg-white rounded-3xl shadow-lg p-8 transition-all duration-1000 delay-100"
              style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-gray-600 to-black rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {partner.bio}
              </p>
            </div>

            {/* Subjects & Skills */}
            <div
              className="bg-white rounded-3xl shadow-lg p-8 transition-all duration-1000 delay-200"
              style={{ animation: "fadeInUp 0.8s ease-out 0.3s both" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-black to-gray-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Subjects & Expertise
                </h2>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  Subjects
                </h3>
                <div className="flex flex-wrap gap-3">
                  {partner.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-5 py-2.5 bg-linear-to-r from-gray-700 via-gray-900 to-black text-white rounded-xl text-sm font-bold border border-blue-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {partner.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-300"
              style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
            >
              <div className="bg-linear-to-r from-gray-700 via-gray-900 to-black rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-2">
                  <Zap size={32} className="opacity-80" />
                  <TrendingUp size={24} className="opacity-60" />
                </div>
                <p className="text-3xl font-bold mb-1">{partner.successRate}</p>
                <p className="text-blue-100 text-sm font-medium">
                  Success Rate
                </p>
              </div>

              <div className="bg-linear-to-r from-gray-700 via-gray-900 to-black rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-2">
                  <Clock size={32} className="opacity-80" />
                  <CheckCircle size={24} className="opacity-60" />
                </div>
                <p className="text-3xl font-bold mb-1">
                  {partner.responseTime}
                </p>
                <p className="text-purple-100 text-sm font-medium">
                  Response Time
                </p>
              </div>

              <div className="bg-linear-to-r from-gray-700 via-gray-900 to-black rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-2">
                  <Users size={32} className="opacity-80" />
                  <Target size={24} className="opacity-60" />
                </div>
                <p className="text-3xl font-bold mb-1">{partnerCount}+</p>
                <p className="text-orange-100 text-sm font-medium">
                  Study Partners
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div
              className="bg-white rounded-3xl shadow-lg p-8 transition-all duration-1000 delay-400"
              style={{ animation: "fadeInUp 0.8s ease-out 0.5s both" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Achievements
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {partner.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-linear-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 hover:scale-105 transition-transform duration-300"
                  >
                    <CheckCircle
                      size={24}
                      className="text-green-600 shrink-0"
                    />
                    <span className="font-semibold text-gray-900 text-sm">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages & Contact */}
            <div
              className="bg-white rounded-3xl shadow-lg p-8 transition-all duration-1000 delay-500"
              style={{ animation: "fadeInUp 0.8s ease-out 0.6s both" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-linear-to-r from-gray-700 via-gray-900 to-black rounded-xl flex items-center justify-center">
                      <Globe size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Languages
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {partner.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-linear-to-r from-gray-700 via-gray-900 to-black rounded-xl flex items-center justify-center">
                      <Mail size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Contact</h3>
                  </div>
                  <a
                    href={`mailto:${partner.email}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
                  >
                    <Mail
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="font-medium">{partner.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Book a Session
            </h3>
            <p className="text-gray-600 mb-6">
              Choose a time that works best for you and {partner.name} will
              confirm shortly.
            </p>

            <div className="space-y-4 mb-6">
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Add a message (optional)"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBooking(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBooking(false);
                  alert("Booking request sent!");
                }}
                className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
