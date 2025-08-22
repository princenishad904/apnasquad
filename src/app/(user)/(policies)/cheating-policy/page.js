import React from "react";
import { Ban, Bug, Zap } from "lucide-react";

const CheatingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-transparent text-gray-200 font-sans p-2">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Cheating <span className="text-yellow-400">Policy</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          We believe in fair play. Cheating of any kind is strictly prohibited.
        </p>
      </header>

      {/* Policy Details Section */}
      <main className="container mx-auto">
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Ban className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Zero Tolerance Policy
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed text-center">
            Tournament mein cheating ke liye hamari **zero-tolerance policy**
            hai. Agar koi player cheat karte hue paaya gaya, toh use turant
            tournament se disqualify kar diya jayega aur bhavishya ke sabhi
            tournaments ke liye ban kar diya jayega.
          </p>
        </section>

        {/* Types of Cheating Section */}
        <section className="bg-slate-950 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Bug className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Types of Cheating
            </h2>
          </div>
          <ul className="space-y-6 text-md md:text-lg">
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Zap className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">
                  Use of Unauthorized Software/Hacks
                </h3>
                <p className="text-gray-300">
                  Yeh kisi bhi tarah ke hacks, scripts, aimbots, wallhacks, ya
                  third-party tools ka istemal karna shamil hai jo gameplay mein
                  unfair advantage dete hain.
                </p>
              </div>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Zap className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Teaming</h3>
                <p className="text-gray-300">
                  Solo ya duo matches mein doosri teams ke saath jaanbujh kar
                  saath milkar khelna cheating hai.
                </p>
              </div>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Zap className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">
                  Account Sharing
                </h3>
                <p className="text-gray-300">
                  Kisi aur player ko apna account tournament mein khelne ke liye
                  dena.
                </p>
              </div>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Zap className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">
                  Exploiting Bugs/Glitches
                </h3>
                <p className="text-gray-300">
                  Game ke bugs ya glitches ka galat faayda uthana, jaise ki map
                  se bahar jaana ya kisi unauthorized jagah mein chipna.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CheatingPolicyPage;
