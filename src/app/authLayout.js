"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetLoggedInUserQuery } from "@/redux/user/userApi";

const AuthLayout = ({ children }) => {
  const router = useRouter();

  const { data: userData, isLoading, isError } = useGetLoggedInUserQuery();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError) {
      router.push("/login");
    }
  }, [isLoading, isError, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
