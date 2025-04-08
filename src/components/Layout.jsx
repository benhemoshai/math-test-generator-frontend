// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, language, toggleLanguage }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="wave1"></div>
          <div className="wave2"></div>
          <div className="wave3"></div>
        </div>
        {/* Floating geometric shapes (same as App) */}
        <div className="absolute top-10 left-10 w-16 h-16 md:w-24 md:h-24 bg-blue-300/30 rounded-xl rotate-12 backdrop-blur-sm"></div>
        <div className="absolute top-1/4 right-10 w-20 h-20 md:w-32 md:h-32 bg-purple-300/20 rounded-full backdrop-blur-sm"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 md:w-40 md:h-40 bg-indigo-300/20 rounded-lg -rotate-12 backdrop-blur-sm"></div>
        <div className="absolute top-2/3 right-1/3 w-12 h-12 md:w-20 md:h-20 bg-blue-300/30 rounded-xl rotate-45 backdrop-blur-sm"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 md:w-28 md:h-28 bg-purple-300/20 rounded-full backdrop-blur-sm"></div>
      </div>

      <Navbar language={language} toggleLanguage={toggleLanguage} />

      {/* Page content */}
      <div className="w-full z-10 pt-24 px-2 sm:px-4 max-w-6xl">{children}</div>
    </div>

    
  );
};

export default Layout;
