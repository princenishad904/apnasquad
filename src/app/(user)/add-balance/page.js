"use client";
import React, { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { useRouter } from "next/navigation";
import { useGetLoggedInUserQuery } from "@/redux/user/userApi";

export default function AddBalance() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();
  const { data, isLoading } = useGetLoggedInUserQuery();
  const quickAmounts = [50, 100, 200, 500];

  const createOrderAndPay = async () => {
    try {
      setErr("");
      if (!amount || Number(amount) < 1) {
        setErr("Minimum amount is ₹10");
        return;
      }
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(amount),
            email: data?.data?.email,
            phone: data?.data?.phone || "",
            _id: data?.data?._id,
          }),
        }
      );

      const json = await res.json();
      if (!json?.success || !json?.data) {
        setErr(json?.message || "Failed to create order");
        setLoading(false);
        return;
      }

      const paymentSessionId = json.data.payment_session_id;
      const orderId = json.data.order_id || json.data.orderId || json.data.order_id;

      if (!paymentSessionId) {
        setErr("No payment session returned from backend.");
        setLoading(false);
        console.error("create-order response:", json);
        return;
      }

      const cashfree = await load({ mode: "production" });
      cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self",
      });

    } catch (e) {
      setErr("Payment failed to initiate");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 transform hover:scale-[1.02] transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Add Balance
          </h2>
          <p className="text-gray-400 text-sm">
            Top up your wallet instantly with secure payments
          </p>
        </div>

        {/* Amount Input Section */}
        <div className="space-y-6">
          <div className="relative group">
            <label htmlFor="amount" className="block text-sm text-gray-300 mb-3 font-medium">
              Enter Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-400 text-lg font-semibold">₹</span>
              </div>
              <input
                type="number"
                id="amount"
                min="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-xl font-semibold placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 group-hover:border-white/20"
                placeholder="0"
              />
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="space-y-3">
            <p className="text-sm text-gray-400 font-medium">Quick Select</p>
            <div className="grid grid-cols-2 gap-3">
              {quickAmounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a.toString())}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    amount === a.toString()
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-transparent text-white shadow-lg shadow-indigo-500/30"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-indigo-500/50 hover:bg-white/10"
                  }`}
                >
                  <span className="font-bold text-lg">₹{a}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {err && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl flex items-center space-x-2 animate-pulse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{err}</span>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={createOrderAndPay}
            disabled={loading || !amount}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-bold text-white text-lg uppercase tracking-wider shadow-lg shadow-indigo-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <span className={`relative z-10 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              Add ₹{amount || '0'}
            </span>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Security Note */}
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 pt-4 border-t border-white/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secured by Cashfree • PCI DSS Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}