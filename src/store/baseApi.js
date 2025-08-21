import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api1.team04.site/api/v1",
    credentials: "include",
  }),
  tagTypes: ["User", "Tournament", "Order", "Admin", "Withdraw"],
  endpoints: () => ({}),
});
