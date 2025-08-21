"use client";
import React, { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { useRouter } from "next/navigation";
import { useGetLoggedInUserQuery } from "@/redux/user/userApi";

export default function AddBalance() {
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();
  const { data, isLoading } = useGetLoggedInUserQuery();
  const quickAmounts = [50, 100, 200, 500];

  const createOrderAndPay = async () => {
    try {
      setErr("");
      if (!amount || Number(amount) < 10) {
        setErr("Minimum amount is ₹10");
        return;
      }
      setLoading(true);

      // 1) create order on backend
      const res = await fetch(
        "http://localhost:5000/api/v1/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            email: data?.data?.email,
            phone: data?.data?.phone || "",
            _id: data?.data?._id, // replace with real user id
          }),
        }
      );

      console.log(res);

      const json = await res.json();
      if (!json?.success || !json?.data) {
        setErr(json?.message || "Failed to create order");
        setLoading(false);
        return;
      }

      const paymentSessionId = json.data.payment_session_id;
      const orderId =
        json.data.order_id || json.data.orderId || json.data.order_id;

      if (!paymentSessionId) {
        setErr("No payment session returned from backend.");
        setLoading(false);
        console.error("create-order response:", json);
        return;
      }

      // 2) load Cashfree SDK
      const cashfree = await load({ mode: "sandbox" }); // 'production' in live
      // 3) open checkout (this will redirect to Cashfree hosted page)
      cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self", // same tab
      });

      // After this the user is redirected. We don't continue here.
    } catch (e) {
      console.error("payment error", e);
      setErr("Payment failed to initiate");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-900/10  rounded-3xl p-4  transform ">
        <h2 className="text-3xl font-bold text-indigo-400 mb-4 tracking-wider text-center">
          Add balance
        </h2>

        <p className="text-sm text-gray-400 mb-6 text-center">
          Enter an amount or choose a quick option to top up your wallet!
        </p>

        <div className="relative mb-6">
          <label
            htmlFor="amount"
            className="block text-sm text-gray-300 mb-2 font-medium"
          >
            Amount (₹)
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              min="10"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-slate-800 border-2 border-indigo-500 rounded-lg px-4 py-3 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-200"
              placeholder="e.g., 500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
              INR
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {quickAmounts.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 border-2 
                ${
                  amount === a
                    ? "bg-indigo-500 text-black border-indigo-500 shadow-lg shadow-emerald-500/30"
                    : "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                }`}
            >
              ₹{a}
            </button>
          ))}
        </div>

        {err && (
          <div className="bg-rose-900/30 text-rose-300 px-4 py-3 rounded-xl mb-4 text-sm text-center">
            {err}
          </div>
        )}

        <button
          onClick={createOrderAndPay}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 font-bold text-black text-lg uppercase tracking-wider shadow-lg shadow-indigo-500/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:transform-none"
        >
          {loading ? "Opening payment gateway..." : `Add ₹${amount}`}
        </button>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Payment is securely processed by Cashfree. You will be redirected to
          their hosted page.
        </p>
      </div>
    </div>
  );
}
