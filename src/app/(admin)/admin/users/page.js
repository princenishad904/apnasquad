"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Search, ArrowLeft, ArrowRight } from "lucide-react";
import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Button component add kiya
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Select component add kiya
import {
  useDeleteUserMutation,
  useLazyGetUsersQuery,
} from "@/redux/admin/adminApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Updateuser from "@/components/admin/UpdateUser";
import { toast } from "sonner";

// Ek simple debounce function jo calls ko delay karta hai
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Users = () => {
  const [query, setQuery] = useState({
    email: "",
    phone: "",
    bgmiId: "",
    id: "",
    role: "",
    page: 1,
    limit: 10,
  });

  const [trigger, { data, isLoading }] = useLazyGetUsersQuery();

  const debouncedTrigger = useCallback(
    debounce((newQuery) => {
      trigger(newQuery);
    }, 500),
    [trigger]
  );

  const handleQuery = (name, value) => {
    const newQuery = { ...query, [name]: value, page: 1 }; // Jab filter change ho toh page 1 par reset karo
    setQuery(newQuery);
    debouncedTrigger(newQuery);
  };

  const handlePageChange = (page) => {
    const newQuery = { ...query, page };
    setQuery(newQuery);
    trigger(newQuery);
  };

  const handleResetFilters = () => {
    const initialQuery = {
      email: "",
      phone: "",
      bgmiId: "",
      id: "",
      role: "",
      page: 1,
      limit: 10,
    };
    setQuery(initialQuery);
    trigger(initialQuery);
  };

  useEffect(() => {
    trigger(query);
  }, [trigger, query]);

  const users = data?.data?.users || [];
  const { currentPage, totalPages, limit } = data?.data || {};

  const handleEdit = (userId) => {
    // Edit modal/navigation logic yahan aayega
  };

  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure ? you want to delete user"
    );

    if (!isConfirmed) return;
    const { data, error } = await deleteUser({ id });

    if (error) return toast.error(error?.data?.message);
    if (data?.success) return toast.success(data?.message);
  };

  return (
    <div className="dark min-h-screen text-gray-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-200">
          User Management
        </h2>

        {/* Search and Filter Section */}
        <div className="mb-6 p-4 rounded-xl bg-gray-800 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search by Email..."
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query.email}
                onChange={(e) => handleQuery("email", e.target.value)}
              />
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search by BGMI ID..."
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query.bgmiId}
                onChange={(e) => handleQuery("bgmiId", e.target.value)}
              />
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search by User ID..."
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query.id}
                onChange={(e) => handleQuery("id", e.target.value)}
              />
            </div>
            {/* Limit select dropdown */}
            <Select
              value={query.limit.toString()}
              onValueChange={(value) => handleQuery("limit", Number(value))}
            >
              <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600 text-white">
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleResetFilters}
              className="bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* User Table */}
        {isLoading ? (
          <div className="w-full h-[50vh] grid place-content-center">
            <Loader size={24} color="white" />
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden bg-gray-900 shadow-xl">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-700 hover:bg-gray-700">
                    <TableHead className="py-3 px-6 text-left rounded-tl-xl text-gray-400">
                      User
                    </TableHead>
                    <TableHead className="py-3 px-6 text-left text-gray-400">
                      ID
                    </TableHead>
                    <TableHead className="py-3 px-6 text-left text-gray-400">
                      Email
                    </TableHead>
                    <TableHead className="py-3 px-6 text-left text-gray-400">
                      Phone
                    </TableHead>
                    <TableHead className="py-3 px-6 text-right text-gray-400">
                      Balance
                    </TableHead>
                    <TableHead className="py-3 px-6 text-right text-gray-400">
                      Bonus
                    </TableHead>
                    <TableHead className="py-3 px-6 text-center rounded-tr-xl text-gray-400">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow
                        key={user._id}
                        className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200"
                      >
                        <TableCell className="py-4 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-3">
                              <Avatar className="size-10 ring-1 ring-gray-600">
                                <AvatarImage
                                  src={
                                    user?.avatar ||
                                    "https://github.com/shadcn.png"
                                  }
                                  className="object-cover"
                                />
                                <AvatarFallback>
                                  {user?.name?.charAt(0) || "U"}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <span className="font-medium text-white">
                              {user.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-left text-gray-300">
                          <span className="truncate w-24 block">
                            {user._id}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-left text-gray-300">
                          {user.email}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-left text-gray-300">
                          {user.phone}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right font-semibold text-green-400">
                          {user.balance}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right font-semibold text-amber-400">
                          {user.bonus}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-center">
                          <div className="flex dark item-center justify-center space-x-2">
                            <Updateuser user={user} />

                            <button
                              onClick={() => handleDelete(user._id)}
                              disabled={isDeletingUser}
                              className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                              title="Delete User"
                            >
                              {isDeletingUser ? (
                                <Loader color="white" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-10 text-gray-400"
                      >
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 bg-gray-800 flex justify-between items-center rounded-b-2xl">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Previous
                </Button>
                <span className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2"
                >
                  Next <ArrowRight size={16} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
