"use client";
import Loader from "@/components/Loader";
import TransactionCard from "@/components/user/TransactionCard";
import { useLazyGetTransactionsQuery } from "@/redux/user/userApi";
import React, { Suspense, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);

  const [trigger, { data, isLoading, isFetching }] =
    useLazyGetTransactionsQuery();

  const params = useSearchParams();
  const type = params.get("type");

  const [query, setQuery] = useState({
    page: 1,
    type: type || "",
  });

  // Yeh useEffect ab single source of truth (query) ko monitor karega
  useEffect(() => {
    // Agar koi filter change hota hai, to transaction list ko reset kare
    // sirf tab jab page 1 ho
    if (query.page === 1) {
      setTransaction([]);
    }
    trigger(query);
  }, [query, trigger]); // Dependency array mein sirf query aur trigger hai

  // Data aane par transaction state ko update karega
  useEffect(() => {
    if (data?.data?.transactions) {
      setTransaction((prev) => [...prev, ...data.data.transactions]);
    }
  }, [data]);

  const handleQueryChange = (key, value) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Koi bhi filter change hone par, page ko 1 par reset kare
    }));
  };

  if (isLoading && transaction.length === 0) {
    return (
      <div className="dark flex h-screen w-full items-center justify-center">
        <Loader color="white" size={24} />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loader color="white" size={24} />}>
      <div className="overflow-hidden">
        <h2 className="px-2 py-4 text-xl font-medium capitalize">
          {type} History
        </h2>
        <div className="dark flex items-center justify-between px-2">
          <span>Filter</span>
          <Button
            variant={"outline"}
            onClick={() => setQuery({ page: 1, type: type || "" })}
          >
            Reset Filter
          </Button>
        </div>
        <div className="dark my-4 grid grid-cols-2 gap-1 px-2">
          <div>
            <Select
              onValueChange={(value) => handleQueryChange("status", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className={"dark"}>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              id="matchTime"
              type="date"
              value={query.matchTime || ""}
              onChange={(e) => handleQueryChange("matchTime", e.target.value)}
            />
          </div>
        </div>

        {transaction.length > 0 ? (
          transaction.map((item, index) => (
            <div key={index}>
              <TransactionCard transaction={item} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No transactions found.</p>
        )}

        {/* Yahi section hai jo loader ko show karta hai */}
        {isFetching && (
          <div className="my-4 flex w-full justify-center">
            <Loader color="white" size={20} />
          </div>
        )}

        {data?.data?.pagination?.hasNextPage && !isFetching && (
          <div className="my-4 flex justify-center">
            <Button
              variant={"outline"}
              onClick={() =>
                setQuery((prev) => ({
                  ...prev,
                  page: prev.page + 1, // Sirf page ko update kiya
                }))
              }
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Transaction;
