"use client";

import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import { useGetLoggedInUserQuery } from "@/redux/user/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Loader from "@/components/Loader";
import { Toaster } from "sonner";
export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { data: user, error, isLoading } = useGetLoggedInUserQuery();

  if (isLoading) {
    return (
      <div className="w-full h-screen grid place-content-center ">
        <Loader size={16} />
      </div>
    );
  }
  return (
    <>
      <div className="flex h-screen font-sans">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex justify-between items-center p-4 lg:p-6 border-b border-slate-800 bg-slate-900 backdrop-blur-lg sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md hover:bg-slate-800 text-white md:hidden"
              >
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
                >
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-white hidden sm:block">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <Bell className="text-slate-400 hover:text-white cursor-pointer" />
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar
                  className={
                    "size-10 ring-1 ring-gray-300 rounded-full overflow-hidden"
                  }
                >
                  <AvatarImage
                    className={"object-cover"}
                    src={user?.data?.avatar || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {user?.data?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-semibold text-white">{user?.data?.name}</p>
                  <p className="text-xs text-slate-400">Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4  order overflow-y-scroll text-white">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors />
    </>
  );
}
