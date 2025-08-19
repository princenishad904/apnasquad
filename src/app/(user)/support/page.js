"use client";
import {
  Headset,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  Youtube,
} from "lucide-react";

// Use a simple icon for the title
const GamingControllerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
    <path d="M15 12h-6m3 3V9" />
  </svg>
);

const page = () => {
  return (
    <div className="bg-[#12121215] min-h-screen text-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-2xl bg-[#1c1c1c] rounded-3xl p-8 shadow-2xl border border-gray-700 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <GamingControllerIcon className="w-12 h-12 text-[#ff4d4d] animate-pulse" />
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-[#ffb6c1] drop-shadow-lg">
            Support Center
          </h1>
        </div>
        <p className="text-center text-gray-400 mb-8 max-w-md mx-auto">
          Need help? We&apos;re here for you! Connect with our team through any
          of the channels below.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Contact Item - WhatsApp */}
          <a
            href="https://wa.me/8707539855"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group shadow-md"
          >
            <div className="p-3 rounded-full bg-green-500/20 text-green-400 group-hover:bg-green-500/30 transition-colors">
              <MessageCircle />
            </div>
            <div>
              <h3 className="font-semibold text-lg">WhatsApp</h3>
              <p className="text-gray-400 text-sm mt-1">+91 8707539855</p>
            </div>
          </a>

          {/* Contact Item - Call */}
          <a
            href="tel:+8707539855"
            className="flex items-center space-x-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group shadow-md"
          >
            <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-colors">
              <Headset />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Calling</h3>
              <p className="text-gray-400 text-sm mt-1">+91 8707539855</p>
            </div>
          </a>

          {/* Contact Item - Email */}
          <a
            href="mailto:support@example.com"
            className="flex items-center space-x-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group shadow-md"
          >
            <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30 transition-colors">
              <Mail />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-400 text-sm mt-1">apnasquad@gmail.com</p>
            </div>
          </a>

          {/* Contact Item - Instagram */}
          <a
            href="https://www.instagram.com/_apnasquad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group shadow-md"
          >
            <div className="p-3 rounded-full bg-pink-500/20 text-pink-400 group-hover:bg-pink-500/30 transition-colors">
              <Instagram />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Instagram</h3>
              <p className="text-gray-400 text-sm mt-1">@_apnasquad</p>
            </div>
          </a>

          {/* Contact Item - YouTube */}
          <a
            href="https://www.youtube.com/apna-squad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group shadow-md"
          >
            <div className="p-3 rounded-full bg-red-500/20 text-red-400 group-hover:bg-red-500/30 transition-colors">
              <Youtube />
            </div>
            <div>
              <h3 className="font-semibold text-lg">YouTube</h3>
              <p className="text-gray-400 text-sm mt-1">Apnasquad</p>
            </div>
          </a>

          {/* Contact Item - Telegram */}
          <a
            href="https://t.me/apnasquad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 rounded-xl bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors duration-300 group shadow-md"
          >
            <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
              <Send />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Telegram</h3>
              <p className="text-gray-400 text-sm mt-1">@_apnasquad</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
