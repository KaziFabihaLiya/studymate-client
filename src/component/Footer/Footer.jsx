import React from 'react';
import { Link } from "react-router";
import {
  Sparkles,
  Facebook,
  X,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Heart,
} from "lucide-react";




const Footer = () => {
      const currentYear = new Date().getFullYear();

      const socialLinks = [
        {
          name: "Facebook",
          icon: Facebook,
          url: "https://facebook.com",
          color: "hover:text-blue-500",
          bgColor: "group-hover:from-blue-500/20 group-hover:to-blue-600/20",
        },
        {
          name: "Twitter",
          icon: X,
          url: "https://twitter.com",
          color: "hover:text-sky-400",
          bgColor: "group-hover:from-sky-400/20 group-hover:to-sky-500/20",
        },
        {
          name: "LinkedIn",
          icon: Linkedin,
          url: "https://linkedin.com",
          color: "hover:text-blue-600",
          bgColor: "group-hover:from-blue-600/20 group-hover:to-blue-700/20",
        },
        {
          name: "Instagram",
          icon: Instagram,
          url: "https://instagram.com",
          color: "hover:text-pink-500",
          bgColor: "group-hover:from-pink-500/20 group-hover:to-purple-500/20",
        },
      ];

      const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Find Partners", path: "/find-partners" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
      ];

      const resourceLinks = [
        { name: "Help Center", path: "/help" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "FAQ", path: "/faq" },
      ];

    return (
      <footer className="relative bg-linear-to-b from-gray-50 to-gray-100 border-t border-gray-200">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Logo and Name */}
              <div className="flex items-center space-x-4 group">
                <div className="relative">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-gray-400 to-gray-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                  {/* Logo container */}
                  <div className="relative flex items-center justify-center w-16 h-16 bg-linear-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl group-hover:shadow-gray-500/50 transition-all duration-500 group-hover:scale-105">
                    <Sparkles
                      className="w-8 h-8 text-gray-800 group-hover:text-gray-900 transition-colors duration-300"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold bg-linear-to-r from-gray-700 via-gray-900 to-black bg-clip-text text-transparent">
                    StudyMate
                  </h2>
                  <span className="text-sm text-gray-600 font-medium">
                    Your Study Partner Network
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed max-w-md">
                Connect with like-minded students, form study groups, and
                achieve academic excellence together. StudyMate makes finding
                the perfect study partner simple, efficient, and enjoyable.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                  <div className="w-9 h-9 bg-linear-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/50">
                    <Mail className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium">
                    support@studymate.com
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                  <div className="w-9 h-9 bg-linear-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/50">
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium">+1 (555) 123-4567</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                  <div className="w-9 h-9 bg-linear-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/50">
                    <MapPin className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                <div className="w-1 h-6 bg-linear-to-b from-gray-600 to-gray-900 rounded-full"></div>
                <span>Quick Links</span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-gray-900 group-hover:scale-150 transition-all duration-300"></div>
                      <span className="text-sm font-medium">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                <div className="w-1 h-6 bg-linear-to-b from-gray-600 to-gray-900 rounded-full"></div>
                <span>Resources</span>
              </h3>
              <ul className="space-y-3">
                {resourceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-gray-900 group-hover:scale-150 transition-all duration-300"></div>
                      <span className="text-sm font-medium">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              {/* Social Links */}
              <div className="flex flex-col items-center md:items-start space-y-4">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Connect With Us
                </h4>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        aria-label={social.name}
                      >
                        {/* Glowing background on hover */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br from-white/40 to-white/20 ${social.bgColor} rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100`}
                        ></div>

                        {/* Icon container */}
                        <div className="relative w-11 h-11 bg-linear-to-br from-white/50 to-white/20 backdrop-blur-sm rounded-xl border border-white/60 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                          <Icon
                            className={`w-5 h-5 text-gray-700 ${social.color} transition-colors duration-300`}
                            strokeWidth={2.5}
                          />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="flex flex-col items-center md:items-end space-y-3">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                  Stay Updated
                </h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 w-64 bg-white/60 backdrop-blur-sm border border-gray-300 rounded-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                  />
                  <button className="px-6 py-2 bg-linear-to-r from-gray-700 to-gray-900 text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="bg-linear-to-r from-[#111]/90 via-[#161616]/90 to-[#111]/90 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex justify-center items-center text-gray-400 text-sm tracking-wide">
              <span>
                © {currentYear}{" "}
                <span className="text-gray-200 font-medium">StudyMate</span>.
                All rights reserved by{" "}
                <span className="text-gray-300">Kazi Fabiha Liya</span>.
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;