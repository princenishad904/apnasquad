import React from "react";
import {
  FileText,
  Handshake,
  CreditCard,
  Shield,
  ScrollText,
} from "lucide-react";

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen  text-gray-200 font-sans px-2">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Terms & <span className="text-yellow-400">Conditions</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Please read these rules and conditions carefully before participating
          in the tournament.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto">
        {/* Section 1: Acceptance of Terms */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Acceptance of Terms
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            By using our platform (the website and tournament services), you
            agree to be bound by all the terms and conditions outlined in this
            document. These terms form a legal agreement between you and us. If
            you do not agree with these terms, you must not use this platform.
          </p>
        </section>

        {/* Section 2: Registration & User Account */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <Handshake className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Registration & User Account
            </h2>
          </div>
          <ul className="space-y-4 text-md md:text-lg">
            <li className="text-gray-400 leading-relaxed">
              Accurate Information: All information provided during registration
              (such as name, email, BGMI ID, etc.) must be accurate and
              complete. Providing false information may lead to
              disqualification.
            </li>
            <li className="text-gray-400 leading-relaxed">
              Account Security: You are fully responsible for the security of
              your account. Do not share your login details with anyone.
            </li>
          </ul>
        </section>

        {/* Section 3: Payments & Refunds */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <CreditCard className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Payments & Refund Policy
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed mb-4">
            Payments are processed through our payment gateway partner,
            Cashfree. All transactions are secure and encrypted.
          </p>
          <ul className="space-y-4 text-md md:text-lg">
            <li className="text-gray-400 leading-relaxed">
              Non-refundable Fee: The tournament registration fee is
              non-refundable. Once a payment is made, no refund will be issued
              under any circumstances, except for the conditions mentioned
              below.
            </li>
            <li className="text-gray-400 leading-relaxed">
              Cases for Refund: A refund will only be processed if (a) the
              entire tournament is cancelled by the organizing party, or (b)
              your payment was duplicated due to a technical error.
            </li>
            <li className="text-gray-400 leading-relaxed">
              Dispute Resolution: In case of any payment disputes, the final
              decision will rest with the tournament organizers.
            </li>
          </ul>
        </section>

        {/* Section 4: Cheating and Fair Play */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Cheating and Fair Play
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            Our tournament has a zero-tolerance policy for cheating and the use
            of hacks. If any player is found to be cheating, they will be
            immediately disqualified from the tournament and banned from all
            future events. Additionally, the entire team may also be banned.
          </p>
        </section>

        {/* Section 5: Governing Law */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <ScrollText className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Governing Law & Jurisdiction
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            These Terms & Conditions shall be governed by and construed in
            accordance with the laws of India. In the event of any dispute, it
            shall be subject to the exclusive jurisdiction of the courts in
            Kushinagar, India.
          </p>
        </section>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;
