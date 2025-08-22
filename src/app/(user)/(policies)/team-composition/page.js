import React from "react";
import { Users, UserPlus, UserMinus, ShieldQuestion } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-transaprent text-gray-200 font-sans p-6 md:p-12">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Team <span className="text-yellow-400">Composition</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Tournament mein participate karne ke liye teams ka structure aur
          roles.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto">
        {/* Team Structure Section */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Team Structure
            </h2>
          </div>
          <ul className="space-y-6 text-md md:text-lg">
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <UserMinus className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Team mein maximum 4 players ho sakte hain,
              </p>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <UserMinus className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Substitutes ko matches ke dauraan team change karne ki
                permission nahi hai.
              </p>
            </li>
          </ul>
        </section>

        {/* Player Roles and Captaincy Section */}
        <section className="bg-transparent p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <ShieldQuestion className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Player Roles & Captaincy
            </h2>
          </div>
          <ul className="space-y-6 text-md md:text-lg">
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Users className="h-6 w-6 text-purple-400 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Har team ko ek Team Captain nominate karna hoga jo team ko
                represent karega aur saari communication ke liye zimmedaar hoga.
              </p>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Users className="h-6 w-6 text-purple-400 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Players ek se zyada team mein register nahi kar sakte.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default page;
