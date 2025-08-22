"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Sidebar from "./Sidebar";

const Header = () => {
  const balance = 10000; // Example balance

  return (
    <header className="sticky top-0 z-50 w-full py-2  bg-black/20  backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4  flex items-center justify-between">
        {/* App Name/Logo - Left Side */}
        <div className="flex items-center space-x-2">
          <Image
            src={"https://i.postimg.cc/02q763xt/app-logo.webp"}
            alt="logo"
            height={48}
            width={48}
          />
        </div>

        {/* Balance - Right Side */}
        <div className="flex items-center space-x-3 dark ">
          <div className="relative group">
            {/* Balance glow effect on hover */}
            <div className="absolute -inset-1 rounded-lg bg-blue-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* User Profile (optional) */}
          <Sidebar />
        </div>
      </div>
    </header>
  );
};

export default Header;
