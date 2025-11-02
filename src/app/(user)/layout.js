"use client";
import React from "react";
import "./user.css";
import Header from "@/components/user/Header";
import BottomNav from "@/components/user/BottomNav";

const Layout = ({ children }) => {
  return (
    <div className="relative text-white max-w-xl mx-auto h-screen bg-gray-900 overflow-hidden">
      {/* Enhanced Aurora Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Main Aurora Elements */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/15 to-blue-600/10 rounded-full -top-1/4 -left-1/4 blur-[100px] animate-pulse"></div>
        <div className="absolute w-[550px] h-[550px] bg-gradient-to-l from-purple-500/10 to-pink-600/15 rounded-full -bottom-1/4 -right-1/4 blur-[120px] animate-pulse animation-delay-2000"></div>
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/80 to-gray-900"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col h-screen">
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