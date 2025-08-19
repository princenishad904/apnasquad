import React from "react";

// --- ICONS ---
// Using simple SVG paths for icons to keep the component self-contained.
const TrophyIcon = (props) => (
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
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M9 9h6v10H9z" />
    <path d="M12 19v-5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5" />
    <path d="M12 19v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
    <path d="M12 9a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2" />
  </svg>
);

const CrosshairIcon = (props) => (
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
    <path d="M22 12h-4" />
    <path d="M2 12h4" />
    <path d="M12 2v4" />
    <path d="M12 22v-4" />
  </svg>
);

const DollarSignIcon = (props) => (
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
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

// --- DUMMY DATA ---
const winnerData = {
  name: "ViperX",
  team: "Team Hydra",
  imageUrl: "https://placehold.co/200x200/0D1117/38bdf8?text=V",
  position: 1,
  kills: 18,
  prize: 5000,
  tournament: "Erangle Ultimate Clash",
};

// --- REUSABLE STAT COMPONENT (HORIZONTAL LAYOUT) ---
const StatItem = ({ icon, label, value, valueClass }) => (
  <div className="text-center">
    <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-white/10 rounded-full">
      {icon}
    </div>
    <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
    <p className={`text-lg font-bold ${valueClass || ""}`}>{value}</p>
  </div>
);

// --- MAIN WINNER CARD COMPONENT ---
export default function WinnerCard() {
  return (
    <div className="min-h-screen bg-[#0D1117] font-sans text-white p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="relative group">
        {/* Aura Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>

        {/* The Horizontal Promotion Card */}
        <div className="relative w-full max-w-2xl bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Image */}
          <div className="md:w-5/12 bg-black/20 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative">
              <img
                src={winnerData.imageUrl}
                alt={winnerData.name}
                className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400 blur-md animate-pulse"></div>
            </div>
            <h3 className="text-3xl font-bold mt-4">{winnerData.name}</h3>
            <p className="text-md text-gray-300">{winnerData.team}</p>
          </div>

          {/* Right Side: Details */}
          <div className="md:w-7/12 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">
                  TOP PERFORMER
                </h2>
                <p className="text-sm text-gray-400">{winnerData.tournament}</p>
              </div>

              {/* Stats Section */}
              <div className="flex justify-around items-center">
                <StatItem
                  icon={<TrophyIcon className="w-6 h-6 text-yellow-400" />}
                  label="Position"
                  value={`#${winnerData.position}`}
                  valueClass="text-yellow-300"
                />
                <StatItem
                  icon={<CrosshairIcon className="w-6 h-6 text-red-400" />}
                  label="Kills"
                  value={winnerData.kills}
                  valueClass="text-red-400"
                />
                <StatItem
                  icon={<DollarSignIcon className="w-6 h-6 text-green-400" />}
                  label="Prize Won"
                  value={`₹${winnerData.prize.toLocaleString()}`}
                  valueClass="text-green-400"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-cyan-500/40 transform transition-all duration-300 hover:scale-105">
                View Match Highlights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
