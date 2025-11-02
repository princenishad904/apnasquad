"use client";
import React from "react";
import {
  ShieldCheck,
  Wallet,
  ArrowRight,
  Ban,
  BadgeIndianRupee,
  Sparkles,
  Play,
  Star,
  Users,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const App = () => {

  
  // Feature items for the modern layout
  const features = [
    { icon: ShieldCheck, text: "100% Secure & Trusted", color: "text-green-400" },
    { icon: Ban, text: "Hacker Protected", color: "text-red-400" },
    { icon: BadgeIndianRupee, text: "Instant Withdrawals", color: "text-yellow-400" },
    { icon: Trophy, text: "Daily Rewards", color: "text-purple-400" },
  ];

  return (
    <div className="relative min-h-screen max-w-md mx-auto overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        {/* <Image
          src={backgroundImageUrl}
          alt="Fantasy Sports Background"
          fill
          className="object-cover"
          priority
        /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6">
        {/* Header */}
        <header className="py-4 text-center">
          
          <h1 className="text-5xl font-black leading-tight tracking-tight text-white uppercase drop-shadow-lg">
            Apna <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Squad</span>
          </h1>
          <p className=" text-lg text-gray-200 font-medium max-w-sm mx-auto leading-relaxed">
            Your money, 100% secure with instant transactions and guaranteed safety.
          </p>
        </header>

        {/* Features Grid */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-2`}>
                <feature.icon className={feature.color} size={24} />
              </div>
              <p className="text-xs font-semibold text-white">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-14 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 backdrop-blur-sm border border-orange-500/30">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-white">1K+</p>
              <p className="text-xs text-orange-200">Active Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">₹10k+</p>
              <p className="text-xs text-orange-200">Won Today</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.1★</p>
              <p className="text-xs text-orange-200">Rating</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-4">
         

          {/* Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="bg-white/90 hover:bg-white text-black font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              asChild
            >
              <Link href="/sign-up">
                Create Account
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="border-white/30 bg-transparent hover:bg-white/10 text-white font-semibold py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-1 text-xs text-gray-300">
              <ShieldCheck size={14} className="text-green-400" />
              SSL Secure
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-300">
              <Users size={14} className="text-blue-400" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-1/4 left-4 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-6 w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/4 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
    </div>
  );
};

export default App;