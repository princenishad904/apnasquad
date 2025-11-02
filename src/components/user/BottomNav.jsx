"use client";
import React from "react";
import {
  HomeIcon,
  TrophyIcon,
  UsersIcon,
  WalletIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Headset, Sparkles, Zap } from "lucide-react";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { 
      id: "home", 
      icon: HomeIcon, 
      label: "Home", 
      href: "/",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "tournaments",
      icon: TrophyIcon,
      label: "My Matches",
      href: "/my-tournaments",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: "support",
      icon: Headset,
      label: "Support",
      href: "/support",
      gradient: "from-emerald-500 to-cyan-500"
    },
    { 
      id: "profile", 
      icon: UserCircleIcon, 
      label: "Profile", 
      href: "/profile",
      gradient: "from-blue-500 to-indigo-500"
    },
  ];

  const handleOnClick = (href) => {
    router.push(href);
  };

  const activeTab = tabs.find((tab) => pathname === tab.href);

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50">
      {/* Floating effect container */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-3xl -z-10" />
        
        {/* Main nav container */}
        <nav className="relative bg-black backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-blue-500/20 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{ x: -20, y: -20, opacity: 0 }}
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                }}
              />
            ))}
          </div>

          <div className="flex justify-around items-center px-4 py-2 relative z-10">
            {tabs.map((tab) => {
              const isActive = activeTab?.id === tab.id;
              const IconComponent = tab.icon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleOnClick(tab.href)}
                  className={`relative flex flex-col items-center justify-center w-full h-14 rounded-xl transition-all duration-500 group ${
                    isActive 
                      ? "text-white" 
                      : "text-gray-400 hover:text-white hover:scale-110"
                  }`}
                >
                  {/* Active background with gradient */}
                  {isActive && (
                    <>
                      {/* Glowing orb effect */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl shadow-lg`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                      
                      {/* Inner glow */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-1 bg-gray-900/90 rounded-lg"
                        transition={{ delay: 0.1 }}
                      />
                      
                      {/* Sparkle effect */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="absolute -top-1 -right-1"
                      >
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                      </motion.div>
                    </>
                  )}

                  {/* Icon container */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Icon with floating animation when active */}
                    <motion.div
                      animate={{ 
                        y: isActive ? [-2, 0, -2] : 0,
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <IconComponent
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive 
                            ? "scale-110 drop-shadow-lg" 
                            : "group-hover:scale-105"
                        }`}
                      />
                    </motion.div>

                    {/* Label with slide-up animation */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, y: 5, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs mt-1 text-white drop-shadow-sm"
                        >
                          {tab.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                      />
                    )}

                    {/* Hover effect */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-lg scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      />
                    )}
                  </div>

                  {/* Notification indicator */}
                  {tab.id === "support" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 z-20"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-red-500 rounded-full border border-white"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 w-2 h-2 bg-red-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          />
        </nav>

       
      </motion.div>
    </div>
  );
};

export default BottomNav;