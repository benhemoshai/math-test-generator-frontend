import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full z-50 px-4 sm:px-8 py-3 sm:py-4 backdrop-blur-lg bg-white/90 shadow-lg fixed top-0 left-0 right-0 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Math Exam Generator (Home) */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-800 tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Math Exam Generator
          </Link>
        </div>

        {/* Desktop menu items */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
            {/* Home button */}
          <Link to="/" className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors duration-200 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
          </Link>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors duration-200 relative group">
                Login
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
              </Link>
              <Link to="/register" className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors duration-200 relative group">
                Register
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
              </Link>
            </>
          )}
          
        </div>

        {/* Right section: Language toggle and mobile menu toggle */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={toggleLanguage}
            className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {language === 'en' ? 'עברית' : 'English'}
          </button>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-blue-700 rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5 bg-blue-600' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-blue-700 rounded-full my-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-blue-700 rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5 bg-blue-600' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`md:hidden bg-white/95 border-t border-gray-200/50 shadow-sm transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48 py-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
        <Link
                to="/"
                onClick={toggleMenu}
                className="w-full max-w-xs text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 py-2 rounded-md transition-colors duration-200 text-center"
              >
                Home
              </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="w-full max-w-xs text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 py-2 rounded-md transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="w-full max-w-xs text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 py-2 rounded-md transition-colors duration-200 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="w-full max-w-xs text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 py-2 rounded-md transition-colors duration-200 text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
