import { baseApi } from "@/store/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    withdraw: builder.mutation({
      query: (data) => ({
        url: "/money/withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateWithdrawStatus: builder.mutation({
      query: (data) => ({
        url: "/admin/update-withdraw",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Withdraw"],
    }),
  }),
  overrideExisting: false,
});

export const { useWithdrawMutation, useUpdateWithdrawStatusMutation } =
  transactionApi;
