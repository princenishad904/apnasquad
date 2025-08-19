"use client";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Swords,
  Users,
  Settings,
  Wallet,
  BarChart,
  LogOut,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard"; // Adjust path
import Link from "next/link";
import { useLogoutMutation } from "@/redux/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "../Loader";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const [logout, { isLoading }] = useLogoutMutation();
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    {
      icon: LayoutDashboard,
      label: "Add Tournaments",
      href: "/admin/create-tournament",
    },
    { icon: Swords, label: "Tournaments", href: "/admin/tournaments" },
    { icon: Users, label: "Users", href: "/admin/users" },
    // { icon: Wallet, label: "Earnings", href: "/admin/earnings" },
    { icon: Wallet, label: "Withdrawals", href: "/admin/withdrawals" },
    { icon: Settings, label: "Transactions", href: "/admin/transactions" },
  ];

  const router = useRouter();

  const handleLogout = async () => {
    const { data, error } = await logout();
    if (error) return toast.error(error?.data?.message);
    if (data?.success) {
      toast.success("logout successfull");
      router.push("/login");
    }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={isSidebarOpen ? "open" : "closed"}
      className="fixed lg:sticky top-0 z-40 h-screen w-64 flex-shrink-0"
    >
      <GlassCard className="h-full flex flex-col p-4 !rounded-none lg:!rounded-r-2xl">
        <div className="flex items-center gap-3 mb-10 p-2 relative">
          <Swords className="text-cyan-400 w-10 h-10" />
          <h1 className="text-2xl font-bold text-white">BattleZone</h1>

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
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-4 p-3 rounded-lg text-slate-300 hover:bg-cyan-400/10 hover:text-cyan-300 transition-all duration-300 ${
                // Simple logic to highlight the active link
                typeof window !== "undefined" &&
                window.location.pathname === item.href
                  ? "bg-cyan-500/20 text-cyan-300"
                  : ""
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-4 p-3 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />{" "}
            {isLoading ? <Loader /> : <span>Logout</span>}
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default Sidebar;
