import { baseApi } from "@/store/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStatus: builder.query({
      query: ({ orderId }) => ({
        url: "/payment/order-status",
        method: "GET",
        params: { orderId },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrderStatusQuery } = paymentApi;
