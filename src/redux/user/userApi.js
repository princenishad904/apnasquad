import { baseApi } from "@/store/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query: () => `/auth/me`,
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getTransactions: builder.query({
      query: (query) => ({
        url: "/user/get-transaction",
        params: query,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateProfileMutation,
  useGetLoggedInUserQuery,
  useLazyGetTransactionsQuery,
} = userApi;
