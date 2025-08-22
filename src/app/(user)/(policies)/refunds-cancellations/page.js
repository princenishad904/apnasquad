import React from "react";
import { RefreshCcw, XCircle, DollarSign, CalendarOff } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen  text-gray-200 font-sans p-2">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Refunds & <span className="text-yellow-400">Cancellations</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Please read our policy carefully regarding refunds and cancellations
          for tournament registration.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto">
        {/* Section 1: No Refunds Policy */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6 justify-center">
            <XCircle className="h-10 w-10 text-red-500 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              General No-Refund Policy
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed text-center">
            Tournament registration fees are non-refundable. Once a payment has
            been made, no refund will be issued under any circumstances, except
            in the specific cases mentioned below. The registration fee is used
            to cover all tournament-related expenses, including the prize pool
            and server costs.
          </p>
        </section>

        {/* Section 2: Valid Reasons for Refund */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6 justify-center">
            <RefreshCcw className="h-10 w-10 text-green-500 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Eligible Cases for Refund
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed mb-6">
            A refund will only be issued in these two cases:
          </p>
          <ul className="space-y-4 text-md md:text-lg">
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <CalendarOff className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Tournament Cancellation
                </h3>
                <p className="text-gray-300">
                  If the entire tournament is cancelled by the organizers, all
                  registered teams will receive a full refund of their
                  registration fee.
                </p>
              </div>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Duplicate Payment
                </h3>
                <p className="text-gray-300">
                  If a single registration results in a duplicate payment due to
                  a technical error, the extra payment amount will be refunded.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Section 3: Ineligible Cases for Refund */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6 justify-center">
            <XCircle className="h-10 w-10 text-red-500 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ineligible for Refunds
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed mb-6">
            No refunds will be given in the following situations:
          </p>
          <ul className="space-y-4 text-md md:text-lg">
            <li className="flex items-start bg-gray-800 p-4 rounded-lg border border-red-500">
              <XCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                If a team is disqualified (e.g., for cheating or breaking
                rules).
              </p>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg border border-red-500">
              <XCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Due to personal technical issues, such as internet or power
                outages.
              </p>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg border border-red-500">
              <XCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                If a team fails to participate in the tournament (a no-show).
              </p>
            </li>
            <li className="flex items-start bg-gray-800 p-4 rounded-lg border border-red-500">
              <XCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-300">
                Due to any player&apos;s disconnection issues.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default page;
