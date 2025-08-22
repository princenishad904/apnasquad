import React from "react";
import { User, CheckCircle, XCircle, Zap } from "lucide-react";

const PlayerEligibilityPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans p-6 md:p-12">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Player <span className="text-yellow-400">Eligibility</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Tournament mein participate karne ke liye zaroori niyam aur shartein.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto">
        {/* Eligibility Requirements Section */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <User className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Eligibility Requirements
            </h2>
          </div>
          <ul className="space-y-6 text-md md:text-lg">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Player ki age 18 years ya usse zyada honi chahiye registration
                ke time tak. Agar player minor hai, toh use apne guardian ka
                consent letter dena hoga.
              </p>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Sabhi participants ka valid Government-issued ID card (Aadhar
                Card, PAN Card, etc.) hona zaroori hai.
              </p>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300 font-bold">
                Har player ke paas ek active BGMI account hona chahiye jiska
                level 40 ke uper hona chahiye.
              </p>
            </li>
          </ul>
        </section>

        {/* Disqualifications Section */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <XCircle className="h-10 w-10 text-red-500 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Disqualifications
            </h2>
          </div>
          <ul className="space-y-6 text-md md:text-lg">
            <li className="flex items-start">
              <XCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Jo players cheating software ya kisi bhi unauthorized tool ka
                use karte hue paaye jayenge, unhein turant disqualify kar diya
                jayega.
              </p>
            </li>
            <li className="flex items-start">
              <XCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Agar koi player doosre players ke saath toxic behavior, team up
                ya verbal abuse karta hai.
              </p>
            </li>
            <li className="flex items-start bg-red-900 bg-opacity-30 p-4 rounded-lg border border-red-500">
              <Zap className="h-8 w-8 text-red-400 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-300 mb-1">
                  Strict Hacking Policy
                </h3>
                <p className="text-red-200">
                  Agar ek player hack karte hue pakda jaata hai, toh na sirf us
                  player ka apnasquad ka account ban ho jayega, balki uski poori
                  squad ko bhi tournament se hamesha ke liye ban kar diya
                  jayega.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default PlayerEligibilityPage;
