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
            invalidatesTags: ["AGENT"],
        }),



        cashOut: builder.mutation<any, { targetUserId: string; amount: number }>({
            query: (payload) => ({
                url: "/wallets/cash-out",
                method: "POST",
                data: payload, // Use 'body' to send data in a POST/PATCH request.
            }),
            // Invalidate tags to refetch data after a successful cash-in.
            invalidatesTags: ["AGENT"],
        }),


        // searchUser: builder.query({
        //     query: (query) => ({
        //         url: `/user/search?query=${query}`
        //     })
        // }),


        transactionHistory: builder.query<any, HistoryQueryParams>({
            query: (params) => ({
                url: "/transactions/my-history",
                method: "GET",
                params,
            }),
        }),


        updateUser: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: payload, // ✅ use 'data', not 'body'
            }),
            invalidatesTags: ["AGENT"],
        }),

    })
})


export const { useCashInMutation, useCashOutMutation, useTransactionHistoryQuery, useUpdateUserMutation } = agentApi;