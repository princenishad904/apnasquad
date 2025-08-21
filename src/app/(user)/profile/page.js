"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditProfileDailog from "@/components/user/EditProfileDailog";
import CreateTeam from "@/components/user/CreateTeam";
import { useSelector } from "react-redux";
import { axiosInstance } from "@/services/axiosInstance";
import { useLogoutMutation } from "@/redux/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useGetLoggedInUserQuery } from "@/redux/user/userApi";
import ProfileLoader from "@/components/user/ProfileLoader";
import Link from "next/link";
import WithdrawDrawer from "@/components/user/WithdrawDrawer";

// Modern icons
const Crown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);

const Swords = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
    <path d="m21 3-3 3" />
    <path d="m3 21 3-3" />
    <path d="M9.5 6.5 21 18v3h-3L6.5 9.5" />
  </svg>
);

const Wallet = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
  </svg>
);

const Trophy = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const Users = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Main Profile Component
export default function Profile() {
  const { data: user, isLoading: isUserGetting } = useGetLoggedInUserQuery();
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    const { data, error } = await logout();
    if (error) return toast.error(error?.data?.message);
    if (data?.success) {
      toast.success("Logout successful");
      router.push("/login");
    }
  };

  if (isUserGetting) {
    return <ProfileLoader />;
  }

  return (
    <div className="w-full min-h-screen bg-transparent font-sans text-white relative overflow-hidden px-4 py-6">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-blue-900/20 to-transparent -z-10"></div>
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 -right-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-md mx-auto z-10 relative">
        {/* Admin Link Button */}
        {user?.data?.role === "admin" && (
          <Link href={"/admin"} className="block mb-4">
            <div className="w-full bg-gradient-to-r from-purple-700 to-blue-700 p-0.5 rounded-xl">
              <div className="bg-gray-900 rounded-xl p-3 text-center font-bold text-white hover:bg-gray-800 transition-colors cursor-pointer">
                Admin Dashboard
              </div>
            </div>
          </Link>
        )}

        {/* Profile Header Card */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 mb-6 shadow-2xl overflow-hidden">
          {/* Light effect behind avatar */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>

          <div className="relative">
            <Avatar className="size-24 ring-4 ring-blue-500/30 transition-transform duration-300 hover:scale-105 z-10">
              <AvatarImage
                className="object-cover"
                src={user?.data?.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="bg-blue-700 text-white">
                {user?.data?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            {/* Online status indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full ring-2 ring-gray-900"></div>
          </div>

          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              {user?.data?.name}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {user?.data?.email || "Email not set"}
            </p>
            {user?.data?.bgmiId && (
              <p className="text-gray-400 text-sm mt-1">
                BGMI ID: {user?.data?.bgmiId}
              </p>
            )}
          </div>
        </div>

        {/* Wallet Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-5 mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl"></div>

          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-400" />
            Wallet Balance
          </h3>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-2xl font-bold text-blue-300">
                ₹{user?.data?.balance.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Main Balance</p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-purple-300">
                ₹{user?.data?.bonus.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Bonus</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <WithdrawDrawer user={user?.data} />
            <Link href={"/add-balance"}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-center py-2 text-sm px-4 rounded-lg transition-all cursor-pointer">
                Add Cash
              </div>
            </Link>
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-5 mb-6 relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl"></div>

          <h3 className="text-lg font-semibold mb-3">Referral Code</h3>

          <div className="bg-gray-800/50 p-3 rounded-lg mb-4 flex justify-between items-center">
            <p className="text-lg font-mono">{user?.data?.referralCode}</p>
          </div>

          <Link href={`/invite?referralCode=${user?.data?.referralCode}`}>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-2.5 rounded-lg transition-all">
              Invite Friends
            </button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-5 mb-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-3">
            <CreateTeam user={user?.data} />
            <EditProfileDailog />

            <Link href={"/transactions"}>
              <div className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg p-3 text-center transition-all cursor-pointer">
                <Wallet className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <p className="text-sm">Transactions</p>
              </div>
            </Link>

            <Link href={"/my-matches"}>
              <div className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg p-3 text-center transition-all cursor-pointer">
                <Swords className="w-6 h-6 text-red-400 mx-auto mb-1" />
                <p className="text-sm">My Matches</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-8 rounded-xl transition-all"
        >
          {isLoading ? <Loader /> : "Logout"}
        </button>
      </div>
    </div>
  );
}
