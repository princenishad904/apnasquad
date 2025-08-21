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

    // authRoutes.route("/request-otp").post(sendResetPasswordOtp);
    // authRoutes.route("/verify-otp-for-reset-password").post(verifyResetPasswordOtp);
    // authRoutes.route("/verify-otp-for-reset-password").patch(resetPassword);

    sendOtpForResetPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/request-otp",
        method: "POST",
        body: { email },
      }),
    }),

    verifyOtpForResetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp-for-reset-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyOtpMutation,

  useSendOtpForResetPasswordMutation,
  useVerifyOtpForResetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
