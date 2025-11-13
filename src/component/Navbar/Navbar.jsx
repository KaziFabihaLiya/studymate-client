import React, { use, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";
import {
  User,
  LogOut,
  LogIn,
  UserPlus,
  Sparkles,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  console.log(user);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = () => {
    signOutUser();
    setDropdownOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const navLinks = user
    ? [
        { to: "/", label: "Home" },
        { to: "/AllPartnerProfile", label: "Find Partners" },
        { to: "/createProfile", label: "Create Partner Profile" },
        { to: "/my-profiles", label: "My Connections" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/AllPartnerProfile", label: "Find Partners" },
      ];

  return (
    <nav
      className={`fixed flex justify-between items-center mx-20 top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out px-6 py-3 ${
        isVisible
          ? "opacity-100 translate-y-0 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          : "opacity-0 -translate-y-8"
      }`}
    >
      {/* Left Side - Logo */}
      <div className="left-side group">
        <Link to="/" className="flex items-center space-x-3">
          <div className="relative">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-linear-to-r from-gray-400/50 to-gray-600/50 dark:from-gray-600/50 dark:to-gray-800/50 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-center w-12 h-12 bg-linear-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-900/5 backdrop-blur-xl rounded-xl border border-white/30 dark:border-gray-700/30 shadow-2xl group-hover:shadow-gray-500/50 dark:group-hover:shadow-gray-400/20 transition-all duration-500 group-hover:scale-105">
              <Sparkles
                className="w-6 h-6 text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300"
                strokeWidth={2.5}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold bg-linear-to-r from-gray-700 via-gray-900 to-black dark:from-gray-300 dark:via-gray-100 dark:to-white bg-clip-text text-transparent group-hover:from-gray-800 dark:group-hover:from-gray-400 group-hover:via-black dark:group-hover:via-gray-200 group-hover:to-gray-900 dark:group-hover:to-gray-50 transition-all duration-500">
              StudyMate
            </h2>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium tracking-wider">
              Find Your Study Partner
            </span>
          </div>
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          <div className="flex space-x-1 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-full py-2 px-4 shadow-xl border border-white/20 dark:border-gray-700/20">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:text-gray-900 dark:hover:text-gray-100 rounded-full transition-all duration-300 ease-out flex items-center transform hover:scale-105 hover:shadow-lg group"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Profile */}
      <div className="right-side flex items-center space-x-3">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* Profile Photo Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="group flex items-center space-x-3 px-4 py-2 bg-linear-to-r from-white/15 to-white/5 dark:from-gray-700/20 dark:to-gray-800/20 backdrop-blur-xl rounded-full border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:shadow-gray-500/20 dark:hover:shadow-gray-400/20 transition-all duration-500 hover:scale-105"
            >
              {/* Profile Photo */}
              <div className="relative">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300"
                  />
                ) : (
                  <div className="w-10 h-10 bg-linear-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 rounded-full flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300">
                    <User
                      className="w-5 h-5 text-white dark:text-gray-200"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>

              {/* User Name */}
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {user.displayName || user.email?.split("@")[0] || "User"}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  View Profile
                </span>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown
                className={`w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2.5}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                {/* User Info Section */}
                <div className="px-4 py-3 bg-linear-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-linear-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 rounded-full flex items-center justify-center">
                        <User
                          className="w-6 h-6 text-white dark:text-gray-200"
                          strokeWidth={2.5}
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {user.displayName || "User"}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[140px]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Options */}
                <div className="py-2">
                  {/* Profile Option */}
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 group"
                  >
                    <div className="w-9 h-9 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center group-hover:from-gray-300 dark:group-hover:from-gray-500 group-hover:to-gray-400 dark:group-hover:to-gray-600 transition-all duration-200">
                      <User
                        className="w-5 h-5 text-gray-700 dark:text-gray-300"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Profile
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        View your profile
                      </span>
                    </div>
                  </button>

                  {/* Theme Toggle Option */}
                  <div className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 group">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-linear-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900 rounded-lg flex items-center justify-center group-hover:from-blue-300 dark:group-hover:from-blue-700 group-hover:to-blue-400 dark:group-hover:to-blue-800 transition-all duration-200">
                        {theme === "dark" ? (
                          <Sun
                            className="w-5 h-5 text-yellow-600"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <Moon
                            className="w-5 h-5 text-blue-700 dark:text-blue-300"
                            strokeWidth={2.5}
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Switch theme
                        </span>
                      </div>
                    </div>
                    <input
                      onChange={(e) => handleTheme(e.target.checked)}
                      type="checkbox"
                      checked={theme === "dark"}
                      className="toggle toggle-sm"
                    />
                  </div>

                  {/* Logout Option */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 group"
                  >
                    <div className="w-9 h-9 bg-linear-to-br from-red-100 to-red-200 dark:from-red-800/50 dark:to-red-900/50 rounded-lg flex items-center justify-center group-hover:from-red-200 dark:group-hover:from-red-700/50 group-hover:to-red-300 dark:group-hover:to-red-800/50 transition-all duration-200">
                      <LogOut
                        className="w-5 h-5 text-red-600 dark:text-red-400"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Logout
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Sign out of account
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            {/* Login button */}
            <Link to="/login">
              <button className="group relative px-5 py-2.5 bg-linear-to-r from-white/15 to-white/5 dark:from-gray-700/20 dark:to-gray-800/20 backdrop-blur-xl rounded-full border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl hover:shadow-gray-500/20 dark:hover:shadow-gray-400/20 transition-all duration-500 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <LogIn
                    className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    Login
                  </span>
                </div>
              </button>
            </Link>

            {/* Register button */}
            <Link to="/register">
              <button className="group relative px-5 py-2.5 bg-linear-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 backdrop-blur-xl rounded-full border border-gray-600 dark:border-gray-500 shadow-xl hover:shadow-2xl hover:shadow-gray-500/50 dark:hover:shadow-gray-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 dark:via-gray-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div className="relative flex items-center space-x-2">
                  <UserPlus
                    className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm font-bold text-white">Register</span>
                </div>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;