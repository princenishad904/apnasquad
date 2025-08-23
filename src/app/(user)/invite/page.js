"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Copy } from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Workaround for `useSearchParams` since Next.js routing is not available in this environment.
// In a real Next.js app, this file would not be needed.

// SVG for the main hero image
const InviteSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-full w-full text-blue-500"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M12 17a5 5 0 0 1-5 5H4a2 2 0 0 1-2-2v-2a5 5 0 0 1 5-5h1" />
  </svg>
);

// Inner component using useSearchParams
function InviteContent() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referralCode") || "YOURCODE123";

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Copy text to clipboard using document.execCommand for better compatibility
    const url = `https://team04.site/sign-up?referralCode=${referralCode}`;
    const el = document.createElement("textarea");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    toast.success("Link copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset state after 2 seconds
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const steps = [
    { text: "Apana referral link share karein." },
    { text: "Aapka friend sign up karega." },
    { text: "Pehla tournament khele aur 100 Rs instant payein." },
  ];

  return (
    <div className="flex flex-col items-center flex-grow justify-center text-center px-4 md:px-8 py-10 bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto">
      <motion.div
        className="w-40 h-40 mb-8 p-4 bg-gray-800 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <InviteSVG />
      </motion.div>

      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Invite friends. Earn 100 Rs instant.
      </motion.h1>

      <motion.div
        className="space-y-4 mb-8 max-w-sm w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4"
            variants={itemVariants}
          >
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold animate-pulse-slow">
              {index + 1}
            </span>
            <p className="text-gray-300 text-sm md:text-base">{step.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative flex items-center justify-between w-full max-w-sm px-4 py-2 bg-gray-800 text-white rounded-full shadow-lg transition-colors duration-300 hover:bg-gray-700 cursor-pointer">
        <span className="font-semibold text-base truncate">{referralCode}</span>
        <Button
          onClick={handleCopy}
          className="ml-2 flex items-center justify-center space-x-2"
          variant="ghost"
        >
          {copied ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Check size={20} className="text-green-500" />
            </motion.div>
          ) : (
            <>
              <motion.div initial={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                <Copy size={20} className="text-white" />
              </motion.div>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default function Invite() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-950 text-white p-4 font-sans">
      <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
        <InviteContent />
      </Suspense>
    </div>
  );
}
