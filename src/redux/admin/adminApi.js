import { baseApi } from "@/store/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashbaordData: builder.query({
      query: () => `/admin/dashboard`,
      providesTags: ["Admin"],
    }),

    updateTournament: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/admin/update/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Tournament"],
    }),
    deleteTournament: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tournament"],
    }),
    getUsers: builder.query({
      query: (query) => ({
        url: `/admin/users`,
        params: query,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/admin/update-user/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // get withdrawals
    getWithdrawals: builder.query({
      query: (query) => ({
        url: "/admin/get-withdrawals",
        method: "GET",
        params: query,
      }),
      providesTags: ["Withdraw"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDashbaordDataQuery,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,

  useLazyGetUsersQuery,

  useUpdateUserMutation,
  useDeleteUserMutation,

  useLazyGetWithdrawalsQuery,
} = adminApi;
