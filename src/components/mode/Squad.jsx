"use client";
import React from "react";
import TeamDetails from "./TeamDetails";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Squad = ({ slot = "0", players = [] }) => {
  const slotArray = Array(4).fill(null);

  return (
    <div className="w-full flex mx-auto flex-col items-start bg-gray-800 bg-opacity-70 border border-gray-700 rounded p-2">
      {/* Team Header */}
      <div className="text-gray-300 text-sm font-semibold mb-3 px-2">
        Slot {slot}
      </div>

      {/* Slots */}
      <div className="flex gap-8 sm:gap-4 xs:gap-2  mx-auto">
        {slotArray.map((_, idx) => {
          const player = players[idx] || null;
          return (
            <div
              key={idx}
              className="relative border border-gray-600 bg-gray-700 bg-opacity-50 size-12 flex items-center justify-center overflow-hidden transition-colors duration-200 hover:border-blue-400 cursor-pointer"
            >
              {player ? (
                <>
                  <Avatar className="w-16 h-16 cursor-pointer">
                    <AvatarImage
                      src={player?.user?.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {player?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 text-[8px] bg-black/80 whitespace-nowrap w-full px-1">
                    {player?.user?.name?.slice(0, 10)}
                  </span>
                </>
              ) : (
                <svg
                  className="absolute w-full h-full text-gray-500 p-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 9a6 6 0 0 0-6 6v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1a6 6 0 0 0-6-6h-4z" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Custom comparison to avoid rerender
function areEqual(prevProps, nextProps) {
  if (prevProps.slot !== nextProps.slot) return false;
  if (prevProps.players.length !== nextProps.players.length) return false;

  // Compare each player id to see if data actually changed
  for (let i = 0; i < prevProps.players.length; i++) {
    if (prevProps.players[i]?.user?.id !== nextProps.players[i]?.user?.id) {
      return false;
    }
  }
  return true;
}

export default React.memo(Squad, areEqual);
