import React from "react";
import {
  Star,
  BookOpen,
  TrendingUp,
  Users,
  Award,
  Quote,
  Zap,
  Target,
} from "lucide-react";

const ExtraSections = ({ testimonials = [] }) => {
  console.log("Testimonials prop:", testimonials);

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
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
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

                    <div className="mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    <p className="text-gray-200 leading-relaxed">
                      "{testimonial.text || "No quote available."}"
                    </p>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">
                  No testimonials available yet. Be the first to share your
                  story!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
