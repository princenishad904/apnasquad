"use client";
import React from "react";
import {
  ArrowLeft,
  Copy,
  MessageCircle,
  Share2,
  PhoneCall,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function App() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  const handleInvite = async (code) => {
    await navigator.clipboard.writeText(
      `https://team04.site/sign-up?referralCode=${code}`
    );
    toast.success("coppied");
  };
  return (
    // Main container with a dark background and full viewport size.
    // It uses flexbox to center the content.
    <div className="flex flex-col items-center justify-between min-h-screen bg-transaprent text-white p-4 font-sans">
      {/* Main content area, centered */}
      <div className="flex flex-col items-center flex-grow justify-center text-center px-4">
        {/* Placeholder for the central graphic. Using a simple SVG to mimic the design. */}
        <div className="w-40 h-40 mb-8 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Outer large circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#333"
              strokeWidth="2"
              fill="none"
            />
            {/* Blue and green arcs and circles to simulate the circular graphic */}
            <path
              d="M50 5 A 45 45 0 1 1 50 95"
              stroke="#007bff"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M50 95 A 45 45 0 1 1 50 5"
              stroke="#00d164"
              strokeWidth="4"
              fill="none"
              transform="rotate(180 50 50)"
            />
            {/* Inner yellow circle with a diamond shape */}
            <circle cx="50" cy="50" r="18" fill="#FFC107" />
            <polygon points="50,42 58,50 50,58 42,50" fill="white" />
            {/* Small floating circles and dots */}
            <circle cx="20" cy="30" r="5" fill="#4CAF50" />
            <circle cx="80" cy="30" r="5" fill="#2196F3" />
            <circle cx="10" cy="65" r="3" fill="#FF9800" />
            <circle cx="90" cy="65" r="3" fill="#9C27B0" />
          </svg>
        </div>

        {/* Heading updated for new offer */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Invite friends. Earn 100 Rs instant.
        </h1>

        {/* Step-by-step instructions */}
        <div className="space-y-4 mb-8 max-w-sm">
          <div className="flex items-center space-x-4">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
              1
            </span>
            <p className="text-gray-300">Apana referral link share karein.</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
              2
            </span>
            <p className="text-gray-300">Aapka friend sign up karega.</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
              3
            </span>
            <p className="text-gray-300">
              Pehla tournament khele aur 100 Rs instant payein.
            </p>
          </div>
        </div>

        {/* Copy referral link button */}

        <div className="flex items-center justify-between w-full max-w-xs px-6 py-3 bg-gray-800 text-white rounded-xl shadow-lg transition-colors">
          <span className="font-semibold text-base">{referralCode}</span>
          <button onClick={() => handleInvite(referralCode)} className="">
            <Copy className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
