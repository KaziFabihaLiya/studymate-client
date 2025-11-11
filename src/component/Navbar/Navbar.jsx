
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../Auth/AuthContext";


const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const navLinks = isLoggedIn
    ? [
        { to: "/", label: "Home" },
        { to: "/find-partners", label: "Find Partners" },
        { to: "/create-profile", label: "Create Partner Profile" },
        { to: "/my-connections", label: "My Connections" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/find-partners", label: "Find Partners" },
      ];

  return (
    <nav
      className={`fixed flex top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 backdrop-blur-md text-black-500 hover:text-black-700"
          : "opacity-0 -translate-y-8"
      }`}
    >
      <div className="left-side">
        <h2>StudyMate</h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          {/* Glassmorphism container for links */}
          <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-full py-2 px-4 shadow-xl border border-white/20">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="px-4 py-2 text-sm font-medium text-black-700  hover:bg-white/20 hover:text-black-700 rounded-full transition-all duration-300 ease-out flex items-center transform hover:scale-105 hover:shadow-lg group"
              >
                <span className="relative">
                  {link.label}
                  {/* Subtle underline hover animation */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="right-side">
        <button>Login</button>
        <button>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
