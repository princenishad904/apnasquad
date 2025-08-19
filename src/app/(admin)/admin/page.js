"use client";

import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { Swords, Users, Video, Wallet } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard"; // Adjust path
import { useGetDashbaordDataQuery } from "@/redux/admin/adminApi";
import Loader from "@/components/Loader";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ icon: Icon, title, value, change, color }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.div variants={cardVariants}>
      <GlassCard className="relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-1 w-full bg-${color}-500`}
        ></div>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full bg-${color}-500/10`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
          </div>
          <div>
            <p className="text-sm text-slate-300">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 ml-16">{change}</p>
      </GlassCard>
    </motion.div>
  );
};

export default function DashboardPage() {
  const { data, isLoading } = useGetDashbaordDataQuery();

  // Define static data for icons and colors
  const staticStats = [
    { icon: Swords, color: "cyan" },
    { icon: Video, color: "red" },
    { icon: Users, color: "purple" },
    { icon: Wallet, color: "green" },
  ];

  // Combine static and dynamic data for stats cards
  const stats = data?.data?.stats?.map((stat, i) => ({
    ...staticStats[i],
    ...stat,
  }));

  // Line Chart
  // Aise kar sakte hain
  const lineChartData = data?.data?.lineChartData
    ? {
        ...data.data.lineChartData,
        datasets: [
          {
            ...data.data.lineChartData.datasets[0],
            borderColor: "rgba(0, 255, 255, 1)", // Cyan color for the line
            backgroundColor: "rgba(0, 255, 255, 0.2)", // Light cyan color for the area below the line
            tension: 0.4, // Thoda curve dene ke liye
          },
        ],
      }
    : null;

  // Doughnut Chart
  // Aise kar sakte hain
  const doughnutChartData = data?.data?.doughnutChartData
    ? {
        ...data.data.doughnutChartData,
        datasets: [
          {
            ...data.data.doughnutChartData.datasets[0],
            backgroundColor: ["#10B981", "#EF4444", "#3B82F6"], // Green, Red, Blue colors
            borderColor: "#1E293B", // Border color for the slices
            borderWidth: 2,
          },
        ],
      }
    : null;

  // Recent Tournaments
  const recentTournaments = data?.data?.recentTournaments;

  if (isLoading) {
    return (
      <div className="w-full h-screen grid place-content-center">
        <Loader size={24} color="white" />
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="w-full h-screen grid place-content-center">No data</div>
    );
  }

  return (
    <>
      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {stats?.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </motion.div>
      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <GlassCard className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">
            Revenue Analytics
          </h2>
          <div className="h-80">
            {lineChartData && (
              <Line
                data={lineChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { ticks: { color: "#94a3b8" } },
                    y: { ticks: { color: "#94a3b8" } },
                  },
                }}
              />
            )}
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-4">
            Tournament Status
          </h2>
          <div className="h-80 flex items-center justify-center">
            {doughnutChartData && (
              <Doughnut
                data={doughnutChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { color: "#e0e0e0" },
                    },
                  },
                }}
              />
            )}
          </div>
        </GlassCard>
      </div>
      {/* Recent Tournaments Table */}
      <GlassCard>
        <h2 className="text-xl font-semibold text-white mb-4">
          Recent Tournaments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700 text-sm text-slate-400">
                <th className="p-4">Tournament Name</th>
                <th className="p-4">Game</th>
                <th className="p-4">Prize Pool</th>
                <th className="p-4">Spots Filled</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTournaments?.map((t, i) => (
                <motion.tr
                  key={i}
                  className="border-b border-slate-800 hover:bg-slate-800/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <td className="p-4 font-semibold text-white">{t.name}</td>
                  <td className="p-4">{t.game}</td>
                  <td className="p-4 text-green-400">{t.prize}</td>
                  <td className="p-4">{t.spots}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        t.status === "Live"
                          ? "bg-red-500/20 text-red-400"
                          : t.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}
