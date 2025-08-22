import React from "react";
import { Gavel, Slash, AlertCircle } from "lucide-react";

const PenaltiesPage = () => {
  return (
    <div className="min-h-screen  text-gray-200 font-sans px-2">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Tournament <span className="text-red-500">Penalties</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Tournament rules todne par di jaane wali sazaon ka silsila.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto">
        {/* Tier 1 Penalties (Minor Infractions) */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <AlertCircle className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Minor Infractions
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed text-center mb-6">
            Yeh choti moti galatiyon ke liye hain jo gameplay par seedha asar
            nahi daalti.
          </p>
          <ul className="space-y-6 text-md md:text-lg">
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Slash className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Late Check-in</h3>
                <p className="text-gray-300">
                  Agar team match ke liye der se join karti hai, toh us team ko
                  us match ke points se 10% ki katauti (deduction) ho sakti hai.
                </p>
              </div>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <Slash className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Unsportsmanlike Conduct
                </h3>
                <p className="text-gray-300">
                  Game ke dauraan verbal abuse ya chhota mota gussa dikhane par
                  warning di jayegi. Repeat karne par team ko point penalty mil
                  sakti hai.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Tier 2 Penalties (Major Infractions) */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <Gavel className="h-10 w-10 text-red-500 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Major Infractions
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed text-center mb-6">
            Yeh serious violations ke liye hain jinse match ka fairness bigadta
            hai.
          </p>
          <ul className="space-y-6 text-md md:text-lg">
            <li className="flex items-start bg-gray-800 p-4 rounded-lg border border-red-500">
              <AlertCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Cheating & Hacking
                </h3>
                <p className="text-gray-300">
                  Kisi bhi tarah ke hacks ya unauthorized software ka istemal
                  karne par, poori team ko turant tournament se disqualify kar
                  diya jayega aur bhavishya ke events ke liye ban kar diya
                  jayega.
                </p>
              </div>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg border border-red-500">
              <AlertCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Killed by hacker
                </h3>
                <p className="text-gray-300">
                  agar koi bhi player hacker se kill hota hai to use ₹100 bonus
                  ke roop me diya jayega or puri server ka paise turant refund
                  ho jayega
                </p>
              </div>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg border border-red-500">
              <AlertCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Account Sharing
                </h3>
                <p className="text-gray-300">
                  Agar koi player apna account kisi aur ko khelne ke liye deta
                  hai, toh us team ko tournament se bahar kar diya jayega.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default PenaltiesPage;
