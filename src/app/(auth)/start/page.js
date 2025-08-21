"use client";
import React from "react";
import {
  ShieldCheck,
  Wallet,
  ArrowRight,
  Ban,
  BadgeIndianRupee,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const App = () => {
  // Use the Dream11-style image for the background
  const imageUrl =
    "https://i.postimg.cc/x8x74Xw6/file-000000004124622fbc66b758bad17549.png";

  // Handlers for the buttons. These are placeholders for now.
  const handleLoginClick = () => {
    console.log("Login button clicked. Navigate to Login page.");
    // TODO: Add navigation to the login page
  };

  const handleCreateAccountClick = () => {
    console.log("Create Account button clicked. Navigate to Sign-up page.");
    // TODO: Add navigation to the sign-up page
  };

  return (
    <div className="relative h-screen max-w-md mx-auto">
      <div className="absolute top-0 left-0 w-full h-screen">
        <Image
          src="https://i.postimg.cc/SNq8RZz7/20250821-161941.webp"
          alt="iamge"
          fill
        />
      </div>

      <div className="w-full  absolute top-0 left-0 z-40 bg-transparent h-screen flex flex-col justify-between py-8">
        <div className=" p-4 text-center  text-white mt-4">
          <h1 className="text-4xl font-extrabold leading-tight tracking-wide uppercase">
            Apna <span className="text-red-500">Squad</span>{" "}
          </h1>
          <p className="mt-2 text-gray-200 text-lg font-medium px-4">
            Aapke paise, 100% secure aur instant transactions ke saath.
          </p>
        </div>

        <div className="text-white">
          <div className="grid grid-cols-2 gap-4 px-4">
            <Link href={"/sign-up"}>
              <Button
                className={
                  "bg-white text-black hover:bg-gray-300 w-full cursor-pointer"
                }
              >
                Create an account
              </Button>
            </Link>

            <Link href={"/login"}>
              <Button
                className={
                  "bg-orange-500 text-white hover:bg-orange-300 w-full cursor-pointer"
                }
              >
                Login
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between px-4 py-4 mt-4">
            <span className="flex items-center text-gray-300 gap-1 text-xs">
              <ShieldCheck size={16} /> 100% Trusted
            </span>
            <span className="flex items-center text-gray-300 gap-1 text-xs">
              <Ban size={16} /> No Hackers
            </span>
            <span className="flex items-center text-gray-300 gap-1 text-xs">
              <BadgeIndianRupee size={16} /> Instant Withdrawals
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
