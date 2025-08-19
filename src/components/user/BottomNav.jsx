"use client";
import React from "react";
import {
  HomeIcon,
  TrophyIcon,
  UsersIcon,
  WalletIcon,
  UserCircleIcon, // Changed from CogIcon for better representation of 'Profile'
} from "@heroicons/react/24/solid"; // Using solid icons for a bolder look
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Headset } from "lucide-react";
const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: "home", icon: HomeIcon, label: "Home", href: "/" },
    {
      id: "tournaments",
      icon: TrophyIcon,
      label: "My Matches",
      href: "/my-tournaments",
    },
    // { id: 'community', icon: UsersIcon, label: 'Community', href: "/community" },
    {
      id: "support",
      icon: Headset,
      label: "support-team",
      href: "/support",
    },
    { id: "profile", icon: UserCircleIcon, label: "Profile", href: "/profile" },
  ];

  const handleOnClick = (href) => {
    router.push(href);
  };

  const activeTab = tabs.find((tab) => pathname === tab.href);

  return (
    <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50">
      <nav className="relative bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-blue-500/10">
        <div className="flex justify-around items-center px-2 ">
          {tabs.map((tab) => {
            const isActive = activeTab?.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleOnClick(tab.href)}
                className={`relative flex flex-col items-center justify-center w-full h-12 rounded-full transition-colors duration-300 z-10 ${
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {/* Icon */}
                <div className="relative">
                  <tab.icon
                    className={`w-6 h-6 transition-transform duration-300 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />
                  {/* Notification dot example */}
                  {tab.id === "wallet" && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full  bg-sky-500"></span>
                    </span>
                  )}
                </div>

                {/* Animated background pill for active tab */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-500/10 rounded-full"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
export default BottomNav;
