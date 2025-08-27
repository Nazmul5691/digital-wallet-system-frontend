/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { HistoryQueryParams } from "@/types";


export const agentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        cashIn: builder.mutation<any, { targetUserId: string; amount: number }>({
            query: (payload) => ({
                url: "/wallets/cash-in",
                method: "POST",
                data: payload, // Use 'body' to send data in a POST/PATCH request.
            }),
            // Invalidate tags to refetch data after a successful cash-in.
            invalidatesTags: ["TRANSACTION", "AGENT"],
        }),



        cashOut: builder.mutation<any, { targetUserId: string; amount: number }>({
            query: (payload) => ({
                url: "/wallets/cash-out",
                method: "POST",
                data: payload, // Use 'body' to send data in a POST/PATCH request.
            }),
            // Invalidate tags to refetch data after a successful cash-in.
            invalidatesTags: ["TRANSACTION", "AGENT"],
        }),

        transactionHistory: builder.query<any, HistoryQueryParams>({
            query: (params) => ({
                url: "/transactions/my-history",
                method: "GET",
                params,
            }),
             providesTags: ["TRANSACTION"],
        }),

        searchUser: builder.query({
            query: (query) => ({
                url: `/user/search?query=${query}`
            })
        }),



        updateUser: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: payload, // ✅ use 'data', not 'body'
            }),
            invalidatesTags: ["USER"],
        }),


         userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            // transformResponse: (response: any) => response.data,
            providesTags: ["AGENT"]
        }),


        getMyWallet: builder.query({
            query: () => ({
                url: "/wallets/my-wallet",
                method: "GET",
            }),
            providesTags: ["AGENT"], // refetch on user changes
        }),

    })
})


export const { useCashInMutation, useCashOutMutation, useLazySearchUserQuery, useTransactionHistoryQuery, useUpdateUserMutation, useUserInfoQuery, useGetMyWalletQuery } = agentApi;