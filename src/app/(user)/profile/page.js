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

const Card = ({ title, subtitle, icon, iconBgColor, href }) => {
  return (
    <Link href={href} className="block group">
      <div className="flex flex-col justify-center items-center py-2 border border-gray-700/50 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30  shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-gray-600 group-hover:shadow-xl group-hover:from-gray-900/70 group-hover:to-gray-800/50">
        <div className={`flex-shrink-0 p-3 rounded-xl ${iconBgColor} transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-semibold text-white text-center">{title}</h3>
          <p className="text-xs text-gray-400 group-hover:text-gray-300 text-center">{subtitle}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      </div>
    </Link>
  );
};

const StatCard = ({ title, value, subtitle, gradient }) => {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg backdrop-blur-sm border border-white/10`}>
      <p className="text-sm text-white/80 mb-1">{title}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-white/60">{subtitle}</p>
    </div>
  );
};

// Main Profile Component
export default function Profile() {
  const { data: user, isLoading: isUserGetting } = useGetLoggedInUserQuery();
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="w-full min-h-screen bg-transaparent font-sans text-white relative overflow-hidden px-4 py-6">
      

      <div className="max-w-md mx-auto z-10 relative">
        {/* Admin Access Cards */}
        {(user?.data?.role === "admin" || user?.data?.role === "manager") && (
          <Link href={"/admin"} className="block mb-6 group">
            <div className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-0.5 rounded-2xl shadow-2xl">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 text-center font-bold text-white transition-all duration-300 group-hover:bg-gray-800/90 group-hover:scale-105 cursor-pointer border border-white/10">
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
        <div className="relative rounded-3xl p-6 mb-6 overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl shadow-2xl">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
          
         

          <div className="flex items-center gap-4 relative z-10">
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 ${isHovered ? 'scale-110 blur-md opacity-70' : 'scale-100 blur-sm opacity-50'}`}></div>
              <Avatar className="size-20 ring-4 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-4 group-hover:ring-blue-400/50 z-10 relative">
                <AvatarImage
                  className="object-cover"
                  src={user?.data?.avatar || "https://github.com/shadcn.png"}
                />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                  {user?.data?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full transition-all duration-300">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
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
        <div className="relative rounded-3xl p-6 mb-6 overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl shadow-2xl">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Wallet Balance
            </h3>
          </div>

          <div className="flex flex-col gap-4 mb-6 relative z-10">
            <StatCard
              title="Main Balance"
              value={`₹${user?.data?.balance?.toLocaleString() || '0'}`}
              subtitle="Available"
              gradient="from-blue-500/20 to-blue-600/20"
            />
            <StatCard
              title="Bonus"
              value={`₹${user?.data?.bonus?.toLocaleString() || '0'}`}
              subtitle="Rewards"
              gradient="from-purple-500/20 to-pink-500/20"
            />
          </div>

          <div className="flex items-center flex-wrap gap-4 justify-between relative z-10">
            <WithdrawDrawer user={user?.data} />
            <Link href={"/add-balance"}>
              <div className="bg-gradient-to-r px-4 from-pink-500 to-pink-500 hover:from-pink-400 hover:to-pink-400 text-white text-center py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer flex items-center justify-center gap-2">
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
        <div className="relative rounded-3xl p-6 mb-6 overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl shadow-2xl">
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Invite Friends
            </h3>
          </div>

          <div className="bg-gray-800/30 border border-white/10 rounded-2xl p-4 mb-4 backdrop-blur-sm relative z-10">
            <p className="text-sm text-gray-400 mb-2">Your Referral Code</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-mono font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                {user?.data?.referralCode}
              </p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(user?.data?.referralCode);
                  toast.success('Referral code copied!');
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <Share2 className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>

          <Link href={`/invite?referralCode=${user?.data?.referralCode}`}>
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 relative z-10">
              <Users className="w-5 h-5" />
              Invite & Earn Rewards
            </button>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border border-red-500/30 hover:border-red-400/50 shadow-lg backdrop-blur-sm flex items-center justify-center gap-2 mb-14"
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

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}