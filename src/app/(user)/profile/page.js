"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { FileText, DollarSign, Wallet, Book, Crown, Users, Gift, LogOut, Settings, User, CreditCard, Share2 } from "lucide-react";

const Swords = (props) => (
  <svg
    xmlns="http://www.w3.org/2000 24"
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

const Card = ({ title, subtitle, icon, iconBgColor, href }) => {
  return (
    <Link href={href} className="block">
      <div className="flex flex-col justify-center items-center py-3 border border-gray-700 rounded-xl bg-gray-900/80">
        <div className={`flex-shrink-0 p-3 rounded-xl ${iconBgColor} mb-2`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-semibold text-white text-center">{title}</h3>
          <p className="text-xs text-gray-400 text-center">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

const StatCard = ({ title, value, subtitle, gradient }) => {
  return (
    <div className={`p-4 rounded-xl ${gradient} border border-gray-700`}>
      <p className="text-sm text-gray-300 mb-1">{title}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
};

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
    <div className="w-full min-h-screen bg-gray-950 font-sans text-white px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Admin Access Cards */}
        {(user?.data?.role === "admin" || user?.data?.role === "manager") && (
          <Link href={"/admin"} className="block mb-6">
            <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-0.5 rounded-xl">
              <div className="bg-gray-900 rounded-xl p-4 text-center font-bold text-white border border-gray-700">
                <div className="flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  {user?.data?.role === "admin" ? "Admin Dashboard" : "Access Dashboard"}
                  <Crown className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Profile Header Card */}
        <div className="rounded-xl p-6 mb-6 border border-gray-700 bg-gray-900">
          <div className="flex items-center gap-4">
            <Avatar className="size-20 border-2 border-gray-600">
              <AvatarImage
                className="object-cover"
                src={user?.data?.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                {user?.data?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">
                {user?.data?.name}
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                {user?.data?.email || "Email not set"}
              </p>
              {user?.data?.bgmiId && (
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-gray-400 text-sm">
                    BGMI ID: {user?.data?.bgmiId}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <CreateTeam user={user?.data} />
          <EditProfileDailog />
        </div>

        {/* Wallet Section */}
        <div className="rounded-xl p-6 mb-6 border border-gray-700 bg-gray-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Wallet Balance
            </h3>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <StatCard
              title="Main Balance"
              value={`₹${user?.data?.balance?.toLocaleString() || '0'}`}
              subtitle="Available"
              gradient="bg-gray-800"
            />
            <StatCard
              title="Bonus"
              value={`₹${user?.data?.bonus?.toLocaleString() || '0'}`}
              subtitle="Rewards"
              gradient="bg-gray-800"
            />
          </div>

          <div className="flex items-center flex-wrap gap-4 justify-between">
            <WithdrawDrawer user={user?.data} />
            <Link href={"/add-balance"}>
              <div className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 text-sm font-semibold rounded-lg cursor-pointer flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                Add Cash
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Card
              title="Game History"
              subtitle="Game records"
              icon={<Swords className="w-5 h-5" />}
              iconBgColor="bg-orange-500/20 text-orange-400"
              href="/transactions?type=game"
            />
            <Card
              title="Transactions"
              subtitle="All transactions"
              icon={<FileText className="w-5 h-5" />}
              iconBgColor="bg-green-500/20 text-green-400"
              href="/transactions?type="
            />
            <Card
              title="Deposits"
              subtitle="Deposit history"
              icon={<Book className="w-5 h-5" />}
              iconBgColor="bg-red-500/20 text-red-400"
              href="/transactions?type=deposit"
            />
            <Card
              title="Withdrawals"
              subtitle="Withdrawal history"
              icon={<Wallet className="w-5 h-5" />}
              iconBgColor="bg-yellow-500/20 text-yellow-400"
              href="/transactions?type=withdraw"
            />
          </div>
        </div>

        {/* Referral Section */}
        <div className="rounded-xl p-6 mb-6 border border-gray-700 bg-gray-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Invite Friends
            </h3>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-400 mb-2">Your Referral Code</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-mono font-bold text-purple-300">
                {user?.data?.referralCode}
              </p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(user?.data?.referralCode);
                  toast.success('Referral code copied!');
                }}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                <Share2 className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>

          <Link href={`/invite?referralCode=${user?.data?.referralCode}`}>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Invite & Earn Rewards
            </button>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-8 rounded-lg border border-red-700 flex items-center justify-center gap-2 mb-14"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <LogOut className="w-5 h-5" />
              Logout
            </>
          )}
        </button>
      </div>
    </div>
  );
}