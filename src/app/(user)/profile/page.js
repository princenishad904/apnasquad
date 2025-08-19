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
// Modern icons ke liye. Aap inko SVG ke roop mein use kar sakte hain.
// In a real project: npm install lucide-react
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

const Target = (props) => (
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
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const BarChart = (props) => (
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
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
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

// Dummy data for the profile
const userProfile = {
  username: "ProGamer123",
  avatarUrl: "https://placehold.co/100x100/1a202c/4a5568?text=P",
  level: 52,
  xp: 75, // Percentage
  walletBalance: 1250,
  stats: {
    totalWins: 112,
    kdRatio: 3.45,
    totalKills: 2480,
    winRate: 18.5,
  },
  recentMatches: [
    {
      id: 1,
      map: "Erangel",
      type: "Squad",
      position: 2,
      total: 25,
      kills: 8,
      result: 100,
    },
    {
      id: 2,
      map: "Miramar",
      type: "Duo",
      position: 1,
      total: 50,
      kills: 12,
      result: 250,
    },
    {
      id: 3,
      map: "Erangel",
      type: "Squad",
      position: 10,
      total: 25,
      kills: 3,
      result: -25,
    },
    {
      id: 4,
      map: "Sanhok",
      type: "Solo",
      position: 5,
      total: 100,
      kills: 6,
      result: 50,
    },
    {
      id: 5,
      map: "Sanhok",
      type: "Solo",
      position: 5,
      total: 100,
      kills: 6,
      result: 50,
    },
  ],
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
      toast.success("logout successfull");
      router.push("/login");
    }
  };

  if (isUserGetting) {
    return <ProfileLoader />;
  }

  return (
    <div className="w-full min-h-screen bg-transparent font-sans text-white p-4 relative overflow-hidden">
      {user?.data?.role === "admin" ? (
        <Link href={"/admin"}>
          {" "}
          <Button
            variant={"outline"}
            className={
              "dark cursor-pointer bg-gradient-to-br from-black/10 to-slate-700 hover:bg-black/20 w-full mb-1"
            }
          >
            Admin
          </Button>
        </Link>
      ) : (
        ""
      )}

      <div className="w-full mx-auto z-10 relative">
        {/* Profile Header Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex  gap-4 mb-4 shadow-2xl shadow-black/20 items-center">
          <Avatar className={"size-20 ring-4 ring-gray-300"}>
            <AvatarImage
              className={"object-cover"}
              src={user?.data?.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>
              {user?.data?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1  text-left">
            <h2 className="text-xl font-bold tracking-tight">
              {user?.data?.name}
            </h2>

            <p className="text-gray-400">
              Email: {user?.data?.email || "Edit profile"}
            </p>
            {user?.data?.bgmiId ? (
              <p className="text-gray-400 text-sm">
                BGMI ID: {user?.data?.bgmiId || "Edit profile"}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className=" text-gray-400 font-semibold text-sm ">
            My Referral code :{" "}
            <span className="text-gray-300">{user?.data?.referralCode}</span>
          </p>

          {user?.data?.bgmiId ? (
            <p className="text-gray-400 text-sm ">
              Phone : {user?.data?.phone}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* create team and update profile button */}
        <div className="w-full grid grid-cols-2 gap-4 mb-4">
          <CreateTeam user={user?.data} />

          <EditProfileDailog />
        </div>

        <div className="bg-white/10 p-4 rounded-xl flex justify-between mb-4 items-center  flex-row-reverse">
          <WithdrawDrawer user={user?.data} />

          <div>
            <p className="text-sm text-gray-400">Wallet Balance</p>
            <p className="text-2xl font-bold">
              ₹{user?.data?.balance.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white/10 p-4 rounded-xl flex justify-between mb-4 items-center  flex-row-reverse">
          <Button
            className={"bg-black/10 border border-gray-500 cursor-pointer"}
          >
            Invite Friends
          </Button>
          <div>
            <p className="text-sm text-gray-400">Bonus Balance</p>
            <p className="text-2xl font-bold">
              ₹{user?.data?.bonus.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <StatCard
              icon={<Crown className="text-yellow-400" />}
              label="Transaction History"
              value={userProfile.stats.totalWins}
            />
            <Link href={"/add-balance"}>
              <StatCard
                icon={<Swords className="text-red-400" />}
                label="Add Balance"
                value={userProfile.stats.totalKills.toLocaleString()}
              />
            </Link>
          </div>
        </div>

        <footer className="mt-4 flex-col justify-center gap-4">
          <button
            onClick={handleLogout}
            className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/20 transform transition-colors duration-300"
          >
            {isLoading ? <Loader /> : "Logout"}
          </button>
        </footer>
      </div>
    </div>
  );
}

// Reusable component for each stat card
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center transform transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 cursor-pointer">
    <div className="w-12 h-auto mx-auto mb-3 flex items-center justify-center bg-gray-800/50 rounded-full">
      {icon}
    </div>
    <p className="text-gray-200 text-sm">{label}</p>
  </div>
);
