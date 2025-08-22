import React from "react";
import { Gamepad2, Trophy, ShieldCheck } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-transparent text-gray-200 font-sans p-6 md:p-12">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          About Our <span className="text-yellow-400">BGMI Tournament</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          India&apos;s most thrilling BGMI tournament, bringing together the
          best squads to compete for glory and massive prize pools.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto">
        {/* Our Mission Section */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Mission
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed text-center">
            Hamara mission India ke esports talent ko ek grand platform provide
            karna hai, jahan woh apni skills dikha sakein aur competitive gaming
            ko ek naye level par le ja sakein. Hum fair play, integrity, aur
            community building ko promote karte hain.
          </p>
        </section>

        {/* What We Offer Section */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Gamepad2 className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What We Offer
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-8">
            <div className="p-6 bg-gray-800 rounded-lg transform transition-transform hover:scale-105 duration-300">
              <ShieldCheck className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Fair Competition
              </h3>
              <p className="text-gray-400">
                Zero-tolerance cheating policy aur strict rules, taaki har match
                fair ho.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg transform transition-transform hover:scale-105 duration-300">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Grand Prize Pools
              </h3>
              <p className="text-gray-400">
                Bade cash prizes aur exclusive in-game items jeetne ka mauka.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg transform transition-transform hover:scale-105 duration-300">
              <Gamepad2 className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Live Streaming
              </h3>
              <p className="text-gray-400">
                Saare matches high-quality live stream par available honge.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
