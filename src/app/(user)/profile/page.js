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
import { FileText, DollarSign, Wallet, Book } from "lucide-react";

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

const Card = ({ title, subtitle, icon, iconBgColor }) => {
  return (
    <div className="flex items-center space-x-4 border border-gray-600 rounded-xl bg-natural-500/20 p-4 shadow-md">
      <div className={`flex-shrink-0 p-3 rounded-xl ${iconBgColor}`}>
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-sm">{title}</h3>
        <p className="text-xs text-neutral-400">{subtitle}</p>
      </div>
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
    <div className="w-full min-h-screen bg-transparent font-sans text-white relative overflow-hidden px-4 py-1">
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
        {user?.data?.role === "manager" && (
          <Link href={"/admin"} className="block mb-4">
            <div className="w-full bg-gradient-to-r from-purple-700 to-blue-700 p-0.5 rounded-xl">
              <div className="bg-gray-900 rounded-xl p-3 text-center font-bold text-white hover:bg-gray-800 transition-colors cursor-pointer">
                Access Dashboard
              </div>
            </div>
          </Link>
        )}

        {/* Profile Header Card */}
        <div className="relative rounded-2xl p-4 flex items-center gap-4 mb-2 overflow-hidden">
          {/* Light effect behind avatar */}
          <div className="absolute -top-10 -left-10 w-32 h-32  rounded-full blur-xl"></div>

          <div className="relative">
            <Avatar className="size-20 ring-4 ring-blue-500/30 transition-transform duration-300 hover:scale-105 z-10">
              <AvatarImage
                className="object-cover"
                src={user?.data?.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback className="bg-blue-700 text-white">
                {user?.data?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              {user?.data?.name}
            </h2>
            <p className="text-gray-400 text-sm">
              {user?.data?.email || "Email not set"}
            </p>
            {user?.data?.bgmiId && (
              <p className="text-gray-400 text-sm mt-1">
                BGMI ID: {user?.data?.bgmiId || "Add your BGMI ID"}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 my-4">
          <CreateTeam user={user?.data} />
          <EditProfileDailog />
        </div>

        {/* Wallet Section */}
        <div className="my-8 relative overflow-hidden">
          <div className="absolute  -right-10 w-28 h-28 rounded-full blur-2xl"></div>

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

        <div className=" text-white my-4 ">
          <div className="grid grid-cols-2 gap-2  w-full">
            {/* Card for Game History */}
            <Link href={"/transactions?type=game"}>
              <Card
                title="Game"
                subtitle="Game history"
                icon={<FileText color="#5A88FF" size={20} />}
                iconBgColor="bg-blue-600/20"
              />
            </Link>

            <Link href={"/transactions?type="}>
              <Card
                title="Transaction"
                subtitle="Transaction history"
                icon={<FileText color="#22B18E" size={20} />}
                iconBgColor="bg-teal-600/20"
              />
            </Link>

            <Link href={"/transactions?type=deposit"}>
              {/* Card for Deposit */}
              <Card
                title="Deposit"
                subtitle="Deposit history"
                icon={<Book color="#E34E57" size={20} />}
                iconBgColor="bg-red-600/20"
              />
            </Link>

            <Link href={"/transactions?type=withdraw"}>
              {/* Card for Withdraw */}
              <Card
                title="Withdraw"
                subtitle="Withdraw history"
                icon={<Wallet color="#EAA64F" size={20} />}
                iconBgColor="bg-orange-600/20"
              />
            </Link>
          </div>
        </div>
        {/* Referral Section */}
        <div className=" p-5 mb-6 relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-28 h-28  rounded-full blur-2xl"></div>

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
