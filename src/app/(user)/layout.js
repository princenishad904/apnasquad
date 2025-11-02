"use client";
import React from "react";
import "./user.css";
import Header from "@/components/user/Header";
import BottomNav from "@/components/user/BottomNav";

const Layout = ({ children }) => {
  return (
    <div className="relative text-white max-w-xl mx-auto h-screen bg-gray-900 overflow-x-hidden">
    

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Enhanced Header with Glass Effect */}
        <div className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <Header />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="max-w-6xl mx-auto ">
            {children}
          </div>
        </main>

        {/* Enhanced Bottom Navigation */}
        <div className="sticky bottom-0 z-50 bg-gray-900/90 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl">
          <div className="max-w-6xl mx-auto">
            <BottomNav />
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default Layout;