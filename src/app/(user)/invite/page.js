"use client";
import React, { Suspense } from "react";
import { Copy } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Yeh inner component banado jo sirf searchParams use karega
function InviteContent() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  const handleInvite = async (code) => {
    await navigator.clipboard.writeText(
      `https://team04.site/sign-up?referralCode=${code}`
    );
    toast.success("Copied");
  };

  return (
    <div className="flex flex-col items-center flex-grow justify-center text-center px-4">
      <div className="w-40 h-40 mb-8 flex items-center justify-center">
        {/* aapka SVG code yaha */}
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
        Invite friends. Earn 100 Rs instant.
      </h1>

      <div className="space-y-4 mb-8 max-w-sm">
        <div className="flex items-center space-x-4">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
            1
          </span>
          <p className="text-gray-300">Apana referral link share karein.</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
            2
          </span>
          <p className="text-gray-300">Aapka friend sign up karega.</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
            3
          </span>
          <p className="text-gray-300">
            Pehla tournament khele aur 100 Rs instant payein.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-w-xs px-6 py-3 bg-gray-800 text-white rounded-xl shadow-lg transition-colors">
        <span className="font-semibold text-base">{referralCode}</span>
        <button onClick={() => handleInvite(referralCode)} className="">
          <Copy className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
}

export default function Invite() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-transparent text-white p-4 font-sans">
      <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
        <InviteContent />
      </Suspense>
    </div>
  );
}
