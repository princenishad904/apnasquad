import Transaction from "@/components/Transaction";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="loader">Loading...</div>
        </div>
      }
    >
      <Transaction />
    </Suspense>
  );
};

export default Page;
