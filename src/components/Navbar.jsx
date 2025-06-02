import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/ChatGPT Image Apr 12, 2025, 05_20_28 PM.png';
import translations from '../translations/translations';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full z-50 px-4 sm:px-8 py-3 sm:py-4 backdrop-blur-lg bg-white/90 shadow-lg fixed top-0 left-0 right-0 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="hidden sm:inline text-xl sm:text-2xl font-bold tracking-tight text-indigo-700">
              Math Exam Generator
            </span>
          </Link>
        </div>

        {/* Desktop menu items */}
<div className={`hidden md:flex flex-1 justify-center items-center gap-12 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
          <Link
            to="/"
            className="text-sm font-medium text-indigo-700 hover:text-rose-600 transition-colors duration-200 relative group"
          >
            {t.nav_home}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
          </Link>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              {t.nav_logout}
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-indigo-700 hover:text-rose-600 transition-colors duration-200 relative group"
              >
                {t.nav_login}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-indigo-700 hover:text-rose-600 transition-colors duration-200 relative group"
              >
                {t.nav_register}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></span>
              </Link>
            </>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {isLoggedIn && user?.name && (
            <span className="hidden md:block text-sm text-gray-700 font-medium">
              👋 {t.nav_welcome}, <span className="font-semibold">{user.name}</span>
            </span>
          )}

          <button
            onClick={toggleLanguage}
            className="w-24 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center"
          >
            {language === 'en' ? 'עברית' : 'English'}
          </button>

          {/* Hamburger menu button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-indigo-700 rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-1.5 bg-rose-600' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-indigo-700 rounded-full my-1 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-indigo-700 rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5 bg-rose-600' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white/95 border-t border-gray-200/50 shadow-sm transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-48 py-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
          {isLoggedIn && user?.name && (
            <div className="text-sm text-gray-700 text-center">
              👋 {t.nav_welcome}, <strong>{user.name}</strong>
            </div>
          )}
          <Link
            to="/"
            onClick={toggleMenu}
            className="w-full max-w-xs text-sm font-medium text-indigo-700 hover:text-rose-600 hover:bg-rose-50 py-2 rounded-md transition-colors duration-200 text-center"
          >
            {t.nav_home}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="w-full max-w-xs text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 py-2 rounded-md transition-colors duration-200"
            >
              {t.nav_logout}
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="w-full max-w-xs text-sm font-medium text-indigo-700 hover:text-rose-600 hover:bg-rose-50 py-2 rounded-md transition-colors duration-200 text-center"
              >
                {t.nav_login}
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="w-full max-w-xs text-sm font-medium text-indigo-700 hover:text-rose-600 hover:bg-rose-50 py-2 rounded-md transition-colors duration-200 text-center"
              >
                {t.nav_register}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
