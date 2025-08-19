"use client";

import Image from "next/image";
import React, { useState } from "react";
import { User, Users, RotateCcw } from "lucide-react";

const MatchCategories = ({ onSelectMap, onSelectMode, onResetFilter }) => {
  const [selectedMapId, setSelectedMapId] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const matchTypes = [
    {
      id: 1,
      mode: "Erangel",
      image: "https://i.postimg.cc/tCstVZK8/erangle-1.webp",
    },
    {
      id: 2,
      mode: "TDM",
      image: "https://i.postimg.cc/Hx34bQs1/tdm.webp",
    },
    {
      id: 3,
      mode: "Sanhok",
      image: "https://i.postimg.cc/2jc76FK4/sanhok.webp",
    },
    {
      id: 4,
      mode: "Miramar",
      image: "https://i.postimg.cc/tCstVZK8/erangle-1.webp",
    },
    {
      id: 5,
      mode: "Livik",
      image: "https://i.postimg.cc/prTQCpph/livik.webp",
    },
    {
      id: 6,
      mode: "Vikendi",
      image: "https://i.postimg.cc/LXm3qySV/vikendi.webp",
    },
    {
      id: 7,
      mode: "Karakein",
      image: "https://i.postimg.cc/4yS6Ss98/karakain.webp",
    },
  ];

  const modeCategories = [
    { name: "Solo", value: "solo" },
    { name: "Duo", value: "duo" },
    { name: "Squad", value: "squad" }, // Using the same icon for Duo and Squad, you can change it if you have a better one.
  ];

  const handleSelectMap = (name, id) => {
    if (selectedMapId === id) return;
    setSelectedMapId(id);
    onSelectMap(name.toLowerCase());
  };

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    onSelectMode(mode.toLowerCase());
  };

  const handleResetFilters = () => {
    setSelectedMapId(null);
    setSelectedMode(null);
    onResetFilter();
  };

  return (
    <div className="relative w-full  bg-black/0 ">
      <div className="w-full flex justify-between my-4">
        <h3 className="text-gray-400">Filter</h3>

        <button
          onClick={handleResetFilters}
          className="
            flex items-center space-x-2 px-2 py-1 rounded-full text-sm
            bg-red-600 text-white hover:bg-red-700 
            
           
          "
        >
          <span className="">Reset Filters</span>
        </button>
      </div>
      {/* Map Categories */}
      <div className="relative w-full h-24  overflow-hidden group mb-2">
        <div className="relative h-full overflow-x-auto scrollbar-hide">
          <div className="absolute inset-0 flex items-center  space-x-4">
            {matchTypes.map((map) => (
              <div
                key={map.id}
                onClick={() => handleSelectMap(map.mode, map.id)}
                className={`
                  relative w-34 h-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl 
                  transition-all duration-300 transform 
                  ${
                    selectedMapId === map.id
                      ? "border-2 border-blue-500 scale-105 shadow-lg shadow-blue-500/50"
                      : "border border-gray-700/50 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                  }
                `}
              >
                <Image
                  src={map.image}
                  alt={map.mode}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 h-full flex flex-col justify-end p-4">
                  <h3 className="text-xl font-extrabold text-white drop-shadow-md tracking-wide">
                    {map.mode}
                  </h3>
                  {selectedMapId === map.id && (
                    <div className="flex items-center mt-1">
                      <div className="w-10 h-1 bg-yellow-500 rounded-full" />
                      <span className="ml-2 text-xs font-semibold text-yellow-400">
                        Selected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solo, Duo, Squad Buttons and Reset */}

      <div className="flex justify-between gap-4  ">
        {modeCategories.map((mode, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectMode(mode.value)}
            className={`
                flex items-center justify-center w-full text-center px-6 py-2 rounded-sm text-sm font-semibold 
                transition-all duration-300
                ${
                  selectedMode === mode.value
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 border border-blue-400"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700/80 hover:text-white border border-gray-600/50"
                }
              `}
          >
            <span
              className={`text-xl  ${
                selectedMode === mode.value ? "scale-110" : ""
              }`}
            ></span>
            <span className="">{mode.name}</span>
          </button>
        ))}
      </div>

      {/* Reset Filter Button */}
    </div>
  );
};

export default MatchCategories;
