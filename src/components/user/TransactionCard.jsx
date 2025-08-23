import { convertToIST, formatISODateToLocal } from "@/lib/convertUTCToIST";
import { Copy, IndianRupee } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const TransactionCard = ({ transaction, key }) => {
  return (
    <div
      key={key}
      className="flex justify-center  px-2 my-4 items-center font-sans"
    >
      <div className=" text-white rounded-md p-2 w-full max-w-md border border-neutral-700">
        {/* Header section with Withdraw and Completed status */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
            {transaction?.type}
          </div>
          <div
            className={`font-semibold text-sm tracking-wider ${
              transaction?.status === "success"
                ? "text-green-500"
                : transaction?.status === "processing"
                ? "text-blue-500"
                : transaction?.status === "failed"
                ? "text-red-500"
                : transaction?.status === "pending"
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
          >
            {transaction?.status}
          </div>
        </div>

        {/* Transaction details grid */}
        <div className="space-y-1">
          {/* Balance row */}
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 font-medium">Balance</span>
            <span className="flex items-center text-amber-400 font-bold text-sm">
              <IndianRupee size={16} strokeWidth={2.5} className="mr-1" />
              {transaction?.amount}
            </span>
          </div>

          {/* Type row */}
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 font-medium">Type</span>
            <span className="text-white font-sm tracking-wider">
              {transaction?.method}
            </span>
          </div>

          {/* Time row */}
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 font-medium">Time</span>
            <span className="text-white font-sm">
              {convertToIST(transaction?.createdAt)}
            </span>
          </div>

          {/* Order number row with copy icon */}
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 font-medium">Transaction Id</span>
            <div className="flex items-center text-white font-xs">
              <span className="mr-2 tracking-wider">
                {transaction?.transactionId}
              </span>
              <button
                className="text-neutral-500 hover:text-white transition-colors duration-200"
                onClick={() => {
                  const orderNumber = "WD2025041010305662316214a";
                  // Use a polyfill or a more robust solution for clipboard access in production
                  navigator.clipboard
                    .writeText(orderNumber)
                    .then(() => toast.success("Transaction ID copied!"))
                    .catch((err) => toast.error("Could not copy text: "));
                }}
              >
                <Copy size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
