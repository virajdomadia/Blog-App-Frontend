import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if user is authenticated by checking token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the Left */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 tracking-wider"
            >
              MyApp
            </Link>
          </div>

          {/* Home Button in the Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="text-gray-800 hover:text-indigo-600 transition duration-300 text-lg font-semibold"
            >
              Home
            </Link>
          </div>

          {/* Authentication Buttons on the Right */}
          <div className="hidden md:flex space-x-4 items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:opacity-80 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:opacity-80 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-full shadow-lg hover:opacity-80 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-800 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-2">
            <Link
              to="/"
              className="block text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block text-white bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-80 px-3 py-2 rounded-md transition duration-300 w-full text-left"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-80 px-3 py-2 rounded-md transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-white bg-gradient-to-r from-green-400 to-teal-500 hover:opacity-80 px-3 py-2 rounded-md transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
