"use client";
import { useGetOrderStatusQuery } from "@/redux/payment/paymentApi";
import { useSearchParams } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Framer Motion variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const OrderDetails = () => {
  const params = useSearchParams();
  const order_id = params.get("order_id");

  // Hum aapke diye hue data ko mock kar rahe hain testing ke liye
  // Production mein aapko yahi data API se milega
  const { data, isLoading } = useGetOrderStatusQuery({ orderId: order_id });

  // Yahaan aap decide kar sakte hain ki kaunsa data use karna hai
  // For this example, we will use the mock data to show both states
  const isPaymentSuccessful = data?.data?.status === "PAID" && data?.success;
  const displayData = isPaymentSuccessful ? data : data;

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gray-950 text-white overflow-hidden">
        {/* Dark Aurora Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-blue-900/30 opacity-60 animate-pulse"></div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-4 border-purple-500 border-solid rounded-full relative z-10"
        ></motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="relative flex items-center justify-center min-h-screen  bg-gray-950 text-white font-sans overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Dark Aurora Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-blue-900/30 opacity-60 animate-pulse"></div>
        <motion.div
          className={`relative p-2 rounded-3xl shadow-2xl text-center w-full max-w-lg transition-all duration-500 transform hover:scale-105 z-10
            ${
              isPaymentSuccessful
                ? "bg-gradient-to-br from-green-900/80 to-teal-900/80 border-2 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                : "bg-gradient-to-br from-red-900/80 to-rose-900/80 border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
            }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div variants={itemVariants}>
            {isPaymentSuccessful ? (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto mb-4 text-green-400 drop-shadow-lg shadow-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </motion.svg>
            ) : (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto mb-4 text-red-400 drop-shadow-lg shadow-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </motion.svg>
            )}
            <h1 className="text-3xl font-extrabold mb-2 text-white">
              {isPaymentSuccessful ? "PAYMENT SUCCESSFUL!" : "PAYMENT FAILED"}
            </h1>
            <p className="text-gray-300 font-light text-xl">
              {isPaymentSuccessful
                ? "Your mission has been completed successfully."
                : "Mission failed. Please check your system logs."}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 text-left p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-3 text-purple-400">
              Transaction Details
            </h2>
            <div className="border-t border-gray-700 my-2"></div>
            <p className="text-gray-400 flex justify-between items-center text-md">
              <span className="font-medium text-gray-300">Order ID:</span>
              <span className="font-mono text-pink-400">
                {displayData.data.orderId}
              </span>
            </p>
            {isPaymentSuccessful && (
              <p className="text-gray-400 flex justify-between items-center mt-2 text-lg">
                <span className="font-medium text-gray-300">Amount Paid:</span>
                <span className="font-mono text-cyan-400">
                  ${displayData.data.amount}
                </span>
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10">
            <button
              className={`w-full py-4 px-6 rounded-full font-bold text-xl tracking-wide uppercase transition-all duration-300 transform hover:scale-105
                ${
                  isPaymentSuccessful
                    ? "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.7)] hover:shadow-[0_0_25px_rgba(34,197,94,1)]"
                    : "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.7)] hover:shadow-[0_0_25px_rgba(239,68,68,1)]"
                }`}
            >
              {isPaymentSuccessful ? "RETURN TO HUB" : "RETRY MISSION"}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetails;
