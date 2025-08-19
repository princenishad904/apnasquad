// components/BattleButtons.js
"use client";
import React, { useState } from "react";

const ModeFilter = () => {
  const [activeMode, setActiveMode] = useState("Solo");

  const buttons = ["Solo", "Duo", "Squad"];

  return (
    <div className="flex bg-[#1a1a1a] p-1.5 rounded-xl border border-[#333] w-fit">
      {buttons.map((mode) => (
        <button
          key={mode}
          onClick={() => setActiveMode(mode)}
          className={`
            py-2 px-5 rounded-lg font-bold
            transition-all duration-300
            ${
              activeMode === mode
                ? "bg-[#ff9900] text-white shadow-[0_0_10px_rgba(255,153,0,0.5)]"
                : "bg-[#2c2c2c] text-[#a0a0a0] hover:bg-[#3b3b3b]"
            }
          `}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default ModeFilter;
