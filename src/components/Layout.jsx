import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, language, toggleLanguage }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-rose-400 z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="wave1"></div>
          <div className="wave2"></div>
          <div className="wave3"></div>
        </div>

        {/* Floating geometric shapes updated to match */}
        <div className="absolute top-10 left-10 w-16 h-16 md:w-24 md:h-24 bg-indigo-300/30 rounded-xl rotate-12 backdrop-blur-sm"></div>
        <div className="absolute top-1/4 right-10 w-20 h-20 md:w-32 md:h-32 bg-rose-300/20 rounded-full backdrop-blur-sm"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 md:w-40 md:h-40 bg-pink-200/20 rounded-lg -rotate-12 backdrop-blur-sm"></div>
        <div className="absolute top-2/3 right-1/3 w-12 h-12 md:w-20 md:h-20 bg-indigo-200/30 rounded-xl rotate-45 backdrop-blur-sm"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 md:w-28 md:h-28 bg-rose-200/20 rounded-full backdrop-blur-sm"></div>

        {/* Additional shapes for wider screens */}
        <div className="hidden lg:block absolute top-1/3 left-20 w-32 h-32 bg-rose-300/15 rounded-2xl rotate-12 backdrop-blur-sm"></div>
        <div className="hidden lg:block absolute bottom-1/3 right-20 w-28 h-28 bg-indigo-300/20 rounded-full backdrop-blur-sm"></div>
        <div className="hidden xl:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full backdrop-blur-sm"></div>
      </div>

      {/* Navbar */}
      <Navbar language={language} toggleLanguage={toggleLanguage} />

      {/* Main Content Area */}
      <div className="flex-1 flex items-start justify-center z-10 pt-20 pb-8 px-4 lg:px-8">
        <div className="w-full max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
