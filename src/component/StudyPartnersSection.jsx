import React, { useState, useEffect } from "react";
import {
  Star,
  BookOpen,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Quote,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";

const StudyPartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchTopPartners();
  }, []);

  // Fetch partners from MongoDB
  const fetchTopPartners = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      // const response = await fetch('/api/partners/top-rated');
      // const data = await response.json();
      // setPartners(data);

      // Simulating API call for demonstration
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching partners:", error);
      setLoading(false);
    }
  };

  const handleViewProfile = (partnerId) => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    window.location.href = `/partner/${partnerId}`;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`transition-all duration-300 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400 scale-100"
                : "text-gray-600 scale-90"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-300">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Study Partners Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-6 border border-blue-100">
              <Sparkles size={18} className="text-blue-600 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">
                Top Rated Partners
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Meet Our Study Champions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with highly-rated study partners who can help you achieve
              your academic goals
            </p>
          </div>

          {/* Partners Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Fetch from MongoDB - Replace with actual data */}
              <div className="text-center text-gray-500 col-span-full py-12">
                <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg">
                  No partners available. Connect your MongoDB to display
                  partners.
                </p>
                <p className="text-sm mt-2">
                  Use:{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    fetch('/api/partners/top-rated')
                  </code>
                </p>
              </div>
            </div>
          )}

          {/* Example Partner Card Template (Use this in your map function) */}
          <div className="hidden">
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

              <div className="relative z-10">
                {/* Profile Image with 3D Effect */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <img
                      src="PARTNER_IMAGE_URL"
                      alt="Partner Name"
                      className="relative w-24 h-24 rounded-full border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Award size={16} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-blue-600 transition-colors">
                  Partner Name
                </h3>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {renderStars(4.9)}
                </div>

                {/* Subjects */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    SUBJECTS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors">
                      Subject 1
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    SKILLS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200">
                      Skill 1
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    127 reviews
                  </span>
                  <span>245 sessions</span>
                </div>

                {/* CTA Button */}
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group/btn">
                  View Profile
                  <ChevronRight
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* 3D Floating Book Element */}
        <div className="absolute top-10 right-10 animate-float-slow hidden lg:block">
          <div className="relative w-32 h-40 transform-gpu perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-2 bg-white/90 rounded flex items-center justify-center">
                <BookOpen size={40} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full mb-6 border border-green-100">
              <Zap size={18} className="text-green-600 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">
                Simple Process
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with your study journey in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={40} />,
                title: "Create Your Profile",
                description:
                  "Sign up and tell us about your subjects, learning style, and academic goals. Customize your profile to attract the perfect study partner.",
                color: "from-blue-500 to-cyan-500",
                step: "01",
                delay: "0s",
              },
              {
                icon: <BookOpen size={40} />,
                title: "Find Perfect Match",
                description:
                  "Browse through top-rated study partners. Filter by subject, availability, and rating to find someone who matches your learning needs.",
                color: "from-purple-500 to-pink-500",
                step: "02",
                delay: "0.2s",
              },
              {
                icon: <TrendingUp size={40} />,
                title: "Start Learning Together",
                description:
                  "Connect with your study partner, schedule sessions, and achieve your academic goals together. Track your progress and grow.",
                color: "from-orange-500 to-red-500",
                step: "03",
                delay: "0.4s",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${item.delay} both`,
                }}
              >
                {/* Step Number Badge */}
                <div
                  className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white text-xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.step}
                </div>

                {/* Icon Container with 3D Effect */}
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full`}
                  ></div>
                  <div
                    className={`relative w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Hover Border Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* 3D Floating Trophy Element */}
        <div className="absolute bottom-10 left-10 animate-float-slow hidden lg:block">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-spin-slow">
              <Award size={50} className="text-white" />
            </div>
          </div>
        </div>

        {/* Animated Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Target size={18} className="text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold text-white">
                Success Stories
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-4 text-white">
              What Students Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real experiences from our thriving study community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Rodriguez",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
                rating: 5,
                text: "Found the perfect study partner for my calculus course. My grades improved from C to A in just one semester! The platform made it so easy to connect.",
                subject: "Mathematics",
                delay: "0s",
              },
              {
                name: "David Kim",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
                rating: 5,
                text: "The platform made it incredibly easy to find someone who shares my learning style. Study sessions are productive and actually fun. Highly recommend!",
                subject: "Computer Science",
                delay: "0.15s",
              },
              {
                name: "Lisa Thompson",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
                rating: 5,
                text: "Great experience overall. The matching system really works and I found partners who motivate me. My study habits have completely transformed!",
                subject: "Biology",
                delay: "0.3s",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${testimonial.delay} both`,
                }}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={60} className="text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-md opacity-50"></div>
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="relative w-16 h-16 rounded-full border-4 border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {testimonial.subject}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">{renderStars(testimonial.rating)}</div>

                  <p className="text-gray-200 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyPartnersSection;
