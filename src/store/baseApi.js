import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["User", "Tournament", "Order", "Admin", "Withdraw"],
  endpoints: () => ({}),
});
