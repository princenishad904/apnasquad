"use client";
import React from "react";
import Link from "next/link";

import useTimeLeft from "../TimeLeft";
import { convertUTCToIST, formatISODateToLocal } from "@/lib/convertUTCToIST";

const MatchCard = ({
  id,
  map,
  playersJoined,
  mode,
  maxTeam,
  teamJoined,
  maxPlayers,
  startTime,
  entryFee,
  prizePool,
  title,
}) => {
  const timeLeft = useTimeLeft(startTime);

  const progressPercent = Math.min((teamJoined / maxTeam) * 100, 100);

  return (
    <div className="relative drop-shadow-xl w-full h-[280px] overflow-hidden rounded-xl bg-slate-800 my-4">
      <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-slate-900">
        <div className="relative z-10 p-4 w-full">
          <span className="font-bold text-md uppercase bg-gradient-to-r from-slate-400 to-gray-100 bg-clip-text text-transparent">
            {title}
          </span>
          {/* Mode and timer */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-cyan-300 mt-1 uppercase">
                {map}
              </h3>
              <h3 className="text-sm text-gray-300">
                {formatISODateToLocal(startTime)}
              </h3>
            </div>

            <div
              className={`px-3 py-2 rounded-lg backdrop-blur-sm ${
                timeLeft.started ? "bg-green-500/20" : "bg-transparent"
              }`}
            >
              {timeLeft.isToday ? (
                <div className="text-center">
                  <p className="text-xs text-white/80">
                    {timeLeft.started ? "LIVE" : "STARTS IN"}
                  </p>
                  {!timeLeft.started ? (
                    <p className="font-mono font-bold text-white text-lg">
                      {String(timeLeft.hours).padStart(2, "0")}:
                      {String(timeLeft.minutes).padStart(2, "0")}:
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </p>
                  ) : (
                    <p className="font-bold text-green-400">JOIN NOW</p>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Players progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-300">
                {`${teamJoined}/${maxTeam} ${
                  mode === "solo" ? "players" : mode
                }`}
              </span>
              <span className="text-white/80">{`${Math.round(
                progressPercent
              )}% FULL`}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Prize and entry */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
            <div className="text-center">
              <p className="text-xs text-white/60">Entry Fee</p>
              <p className="font-bold text-yellow-400 flex items-center justify-center">
                {entryFee <= 0 ? "Free" : `₹${entryFee}/ ${mode}`}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-white/60">Type</p>
              <p className="font-bold text-white flex items-center justify-center">
                {mode.toUpperCase()}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-white/60">Prize Pool</p>
              <p className="font-bold text-green-400 flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {prizePool}
              </p>
            </div>

            {!timeLeft.started && (
              <Link href={`/join/${id}`}>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                  Join
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="absolute w-96 h-66 bg-blue-400 blur-[50px] left-1/2 top-1/2" />
      <div className="absolute w-96 h-66 bg-black blur-[50px] -left-1/2 -top-1/2" />
    </div>
  );
};

export default MatchCard;
