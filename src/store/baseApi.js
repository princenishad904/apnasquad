import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://apnasquad-backend.onrender.com/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["User", "Tournament", "Order", "Admin", "Withdraw"],
  endpoints: () => ({}),
});
