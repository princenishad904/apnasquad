const { baseApi } = require("@/store/baseApi");

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    sendOtpForResetPassword: builder.mutation({
      query: (identifier) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: { identifier },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ identifier, password }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { identifier, password },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOtpForResetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
