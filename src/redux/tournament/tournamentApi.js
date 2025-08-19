import { baseApi } from "@/store/baseApi";

const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTournament: builder.mutation({
      query: (data) => ({
        url: "/tournament/create",
        method: "POST",
        body: data,
      }),
      providesTags: ["Tournament"],
    }),

    getHomePageTournament: builder.query({
      query: (query) => ({
        url: "/tournament/get",
        method: "GET",
        params: query,
      }),
      invalidatesTags: ["Tournament"],
    }),
    getMyTournaments: builder.query({
      query: (query) => ({
        url: "/tournament/get-my-tournaments",
        method: "GET",
        params: query,
      }),
    }),

    getTournamentDetails: builder.query({
      query: ({ tournamentId }) => ({
        url: "/tournament/get-details",
        params: { tournamentId },
      }),
      providesTags: ["Tournament"],
    }),

    joinTournament: builder.mutation({
      query: ({ tournamentId }) => ({
        url: "/tournament/join",
        method: "POST",
        params: { tournamentId },
      }),
      invalidatesTags: ["Tournament"],
    }),

    joinTournamentViaPassword: builder.mutation({
      query: ({ teamId, teamPassword }) => ({
        url: "/tournament/join-team",
        method: "POST",
        body: { teamId, teamPassword },
      }),
      invalidatesTags: ["Tournament"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTournamentMutation,
  useGetHomePageTournamentQuery,
  useGetTournamentDetailsQuery,
  useJoinTournamentMutation,
  useJoinTournamentViaPasswordMutation,
  useLazyGetHomePageTournamentQuery,
  useLazyGetMyTournamentsQuery,
} = tournamentApi;
