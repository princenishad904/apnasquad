import React from "react";
import { Lock, User, Shield, Mail, FileText, Share2, Info } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen  text-gray-200 font-sans px-2">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Privacy <span className="text-yellow-400">Policy</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          We are committed to protecting your privacy. This policy explains how
          we handle your personal data.
        </p>
      </header>

      {/* Main Content Sections */}
      <main className="container mx-auto">
        {/* Section 1: Introduction */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <Info className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Introduction
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a registration on
            our website for the BGMI tournament. By using our services, you
            consent to the data practices described in this policy.
          </p>
        </section>

        {/* Section 2: Information We Collect */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <User className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Information We Collect
            </h2>
          </div>
          <ul className="space-y-4 text-md md:text-lg">
            <li className="text-gray-400 leading-relaxed">
              Personal Information: When you register, we collect your name,
              email address, phone number, and a copy of your government-issued
              ID for age verification and identity checks.
            </li>
            <li className="text-gray-400 leading-relaxed">
              Tournament-Related Information: We collect your in-game BGMI ID
              and team details to manage tournament participation.
            </li>
            <li className="text-gray-400 leading-relaxed">
              Payment Information: For processing registration fees, we collect
              payment details through our payment gateway partner, Cashfree. We
              do not store your credit card or bank account information on our
              servers.
            </li>
          </ul>
        </section>

        {/* Section 3: How We Use Your Information */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              How We Use Your Information
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="space-y-4 list-disc list-inside text-gray-400 mt-4">
            <li>
              Process your tournament registration and manage your
              participation.
            </li>
            <li>
              Communicate with you regarding tournament updates, schedules, and
              results.
            </li>
            <li>
              Verify your identity and ensure you meet the eligibility criteria.
            </li>
            <li>
              Maintain the security and integrity of the tournament and our
              services.
            </li>
          </ul>
        </section>

        {/* Section 4: Sharing Your Information */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <Share2 className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Sharing Your Information
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className="space-y-4 list-disc list-inside text-gray-400 mt-4">
            <li>
              Third-Party Service Providers: We use trusted partners like
              Cashfree to process payments. These providers have their own
              privacy policies governing their use of your information.
            </li>
            <li>
              Legal Authorities: If required by law, we may disclose your
              information to comply with a legal obligation or to protect our
              rights.
            </li>
          </ul>
        </section>

        {/* Section 5: Data Security */}
        <section className="mb-12 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Data Security
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            We use commercially reasonable security measures to protect your
            personal information from unauthorized access, use, or disclosure.
            However, no internet transmission is entirely secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        {/* Section 6: Changes to This Policy */}
        <section className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <Mail className="h-8 w-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Contact Us
            </h2>
          </div>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at: theapnasquad@gmail.com
          </p>
        </section>
      </main>
    </div>
  );
};

export default page;
