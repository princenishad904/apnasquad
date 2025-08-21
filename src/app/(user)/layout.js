"use client";
import React from "react";
import "./user.css";
import Header from "@/components/user/Header";
import BottomNav from "@/components/user/BottomNav";

const Layout = ({ children }) => {
  return (
    <div className="relative text-white max-w-xl mx-auto h-screen bg-gray-900">
      {/* Aurora background effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse-slow"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-700/20 rounded-full right-0 bottom-0 translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Content layout */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Fixed Header */}
        <div className="sticky top-0 z-20 bg-gray-900">
          <Header />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-12">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>

        {/* Fixed BottomNav */}
        <div className="sticky bottom-0 z-20 bg-gray-900">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default Layout;
