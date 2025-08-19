"use client";
import { useLazyGetWithdrawalsQuery } from "@/redux/admin/adminApi";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useUpdateWithdrawStatusMutation } from "@/redux/transaction/transactionApi";
import Loader from "@/components/Loader";

const Withdrawals = () => {
  // `page` state ko `query` object mein consolidate kiya hai taaki state sync mein rahe
  const [withdrawals, setWithdrawals] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [query, setQuery] = useState({
    page: 1, // Start with page 1
    transactionId: "",
    status: "",
  });

  // update status
  const [updateWithdrawStatus, { isLoading: isUpdating }] =
    useUpdateWithdrawStatusMutation();
  const handleStatus = async (status, transactionId, _id) => {
    const { data, error } = await updateWithdrawStatus({
      status,
      transactionId,
      _id,
    });

    if (error) return toast.error(error?.data?.message);
    if (data) return toast.success(data?.message);
  };
  const [trigger, { data, isLoading, isError, isFetching }] =
    useLazyGetWithdrawalsQuery();

  // Debounced search input ke change par query ko reset karein
  useEffect(() => {
    // Jab search input change ho, toh page ko 1 par reset karein aur withdrawals data clear karein
    setQuery({
      page: 1,
      transactionId: debouncedSearch,
    });
    setWithdrawals([]);
  }, [debouncedSearch]);

  // Data fetching logic ko ek hi useCallback hook mein rakhein
  const fetchWithdrawals = useCallback(async () => {
    // Extra fetches ko rokein jab loading/fetching ho ya koi error ho
    if (isLoading || isFetching) return;

    try {
      // `unwrap()` ka use karke promise se data extract karein
      const result = await trigger(query).unwrap();

      if (result?.data?.withdrawals) {
        // Naye data ko existing data ke saath merge karein, duplicates ko filter karte hue
        setWithdrawals((prev) => {
          const newWithdrawals = result.data.withdrawals.filter(
            (newWithdrawal) =>
              !prev.some((existing) => existing._id === newWithdrawal._id)
          );
          return [...prev, ...newWithdrawals];
        });
      }
    } catch (error) {
      console.error("Failed to fetch withdrawals:", error);
    }
  }, [trigger, query]);

  // Yeh useEffect tabhi data fetch karega jab `query` state change ho
  useEffect(() => {
    // Debounce ke baad, jab query final ho jaye, tab hi fetch karein
    fetchWithdrawals();
  }, [fetchWithdrawals]);

  // Manual pagination (previous page)
  const handlePrevPage = () => {
    if (query.page > 1) {
      setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
      setWithdrawals([]); // Previous page par jaane par data reset karein
    }
  };

  // Manual pagination (next page)
  const handleNextPage = () => {
    if (query.page < (data?.data?.totalPages || 1)) {
      setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
      setWithdrawals([]); // Next page par jaane par data reset karein
    }
  };

  const handleResetFilter = () => {
    setQuery({
      page: 1, // Start with page 1
      transactionId: "",
      status: "",
    });
    setWithdrawals([]); // Next page par jaane par data reset karein
  };

  const handleQuery = ({ status }) => {
    setQuery((prev) => ({ ...prev, status: status }));
    setWithdrawals([]); // Next page par jaane par data reset karein
  };

  return (
    <div className="p-4 bg-gray-950 min-h-screen text-gray-200 font-sans antialiased">
      <h1 className="text-3xl font-bold mb-6  text-white">
        Withdrawal Requests
      </h1>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Input
              className="bg-gray-800 text-white border-gray-700 placeholder-gray-500 focus:border-green-500"
              placeholder="Search by Transaction ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div>
            <Select onValueChange={(value) => handleQuery({ status: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className={"dark"}>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>

                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button onClick={handleResetFilter}>Reset Filter</Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden bg-gray-900 shadow-xl border border-gray-800">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-800">
                <TableHead className="py-4 px-6 text-left rounded-tl-xl text-gray-400 font-semibold uppercase tracking-wider">
                  User
                </TableHead>
                <TableHead className="py-4 px-4 text-left text-gray-400 font-semibold uppercase tracking-wider">
                  Transaction ID
                </TableHead>
                <TableHead className="py-4 px-1 text-left text-gray-400 font-semibold uppercase tracking-wider">
                  Amount
                </TableHead>
                <TableHead className="py-4 px-6 text-left text-gray-400 font-semibold uppercase tracking-wider">
                  Method
                </TableHead>
                <TableHead className="py-4 px-6 text-center text-gray-400 font-semibold uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="py-4 px-6 text-left rounded-tr-xl text-gray-400 font-semibold uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="py-4 px-6 text-left rounded-tr-xl text-gray-400 font-semibold uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals.length > 0 ? (
                withdrawals.map((withdrawal) => (
                  <TableRow
                    key={withdrawal._id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200"
                  >
                    <TableCell className="py-4 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 ring-1 ring-gray-600">
                          <AvatarImage
                            src={
                              withdrawal.userId.avatar ||
                              "https://github.com/shadcn.png"
                            }
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gray-600 text-gray-200">
                            {withdrawal.userId.name.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">
                            {withdrawal.userId.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {withdrawal.userId.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-2 font-mono text-sm text-gray-400">
                      <span className="truncate  block">
                        {withdrawal.transactionId}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-2 text-center font-semibold text-green-400">
                      ₹{withdrawal.amount}
                    </TableCell>
                    <TableCell className="py-4 px-6 uppercase text-gray-400">
                      {withdrawal.withdrawalMethod}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      <Badge
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          withdrawal.status === "pending"
                            ? "bg-yellow-800 text-yellow-300"
                            : withdrawal.status === "success"
                            ? "bg-green-800 text-green-300"
                            : withdrawal.status === "failed"
                            ? "bg-red-500 text-white"
                            : "bg-purple-600 text-white"
                        }`}
                      >
                        {withdrawal.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-sm text-gray-400">
                      {format(
                        new Date(withdrawal.createdAt),
                        "dd MMM yyyy, hh:mm a"
                      )}
                    </TableCell>
                    <TableCell className="p-4  text-center text-sm text-gray-400 dark">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                          <Pencil size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className={"dark mr-8 -mt-8"}
                          align={"end"}
                        >
                          <DropdownMenuLabel>
                            {isUpdating ? <Loader /> : "Change Status"}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatus(
                                "success",
                                withdrawal.transactionId,
                                withdrawal._id
                              )
                            }
                          >
                            Success
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatus(
                                "processing",
                                withdrawal.transactionId,
                                withdrawal._id
                              )
                            }
                          >
                            Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatus(
                                "pending",
                                withdrawal.transactionId,
                                withdrawal._id
                              )
                            }
                          >
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatus(
                                "failed",
                                withdrawal.transactionId,
                                withdrawal._id
                              )
                            }
                          >
                            Failed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-gray-400"
                  >
                    {isFetching ? "Loading..." : "No withdrawals found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-sm text-gray-400">
            Showing page {query.page} of {data?.data?.totalPages || 1}
          </p>
        </div>
        <div className="flex gap-2 dark">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={query.page === 1 || isLoading || isFetching}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={
              query.page >= (data?.data?.totalPages || 1) ||
              isLoading ||
              isFetching
            }
          >
            Next
          </Button>
        </div>
      </div>

      {isFetching && query.page > 1 && (
        <div className="text-center mt-4 text-gray-400">Loading more...</div>
      )}
    </div>
  );
};

export default Withdrawals;
