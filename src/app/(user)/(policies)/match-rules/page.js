import React from "react";
import { Sword, Users, Calendar, Clock, MapPin } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-transaprent text-gray-200 font-sans p-6 md:p-12">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Match Rules
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Tournament ke dauraan follow kiye jaane wale sabhi niyam.
        </p>
      </header>

      {/* Match Details Section */}
      <main className="container mx-auto">
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              General Match Details
            </h2>
          </div>
          <ul className="space-y-6 text-md md:text-lg">
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Clock className="h-6 w-6 text-gray-400 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Match shuru hone se 10 minute pehle sabhi teams ko Room & ID
                apnasquad ke registred tournament me mil jayega
              </p>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <MapPin className="h-6 w-6 text-gray-400 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Match ka map aur mode, tournament ke schedule ke anusaar hoga.
              </p>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Sword className="h-6 w-6 text-gray-400 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Tournament mein TTP ya FPP modes ka use kr sakte ho
              </p>
            </li>
          </ul>
        </section>

        {/* Rules for Solo, Duo & Squad */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Specific Rules
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Solo Rules */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Solo
              </h3>
              <ul className="space-y-4 text-sm md:text-base text-gray-300 list-disc list-inside">
                <li>Solo matches mein teaming sakht mana hai.</li>
                <li>
                  Agar do players ko teaming karte hue paaya gaya toh dono
                  players ko disqualify kar diya jayega.
                </li>
                <li>
                  Kisi bhi external communication (jaise voice call) ki
                  permission nahi hai.
                </li>
              </ul>
            </div>
            {/* Duo Rules */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Duo
              </h3>
              <ul className="space-y-4 text-sm md:text-base text-gray-300 list-disc list-inside">
                <li>
                  Duo matches mein sirf apni team ke member ke saath hi khel
                  sakte hain.
                </li>
                <li>
                  Kisi dusri duo team ke saath teaming karne par
                  disqualification ho sakta hai.
                </li>
              </ul>
            </div>
            {/* Squad Rules */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Squad
              </h3>
              <ul className="space-y-4 text-sm md:text-base text-gray-300 list-disc list-inside">
                <li>
                  Squad matches mein team ke sabhi members ko ek saath khelna
                  hoga.
                </li>
                <li>
                  Kisi bhi team ke paas 4 se kam players honge toh unhein us
                  match ke liye points nahi milenge.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
