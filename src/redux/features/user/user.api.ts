/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { HistoryQueryParams } from "@/types";


export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            // transformResponse: (response: any) => response.data,
            providesTags: ["USER"]
        }),


        searchUser: builder.query({
            query: (query) => ({
                url: `/user/search?query=${query}`
            })
        }),



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
            invalidatesTags: ["USER"],
        }),

    })
})


export const { useUserInfoQuery, useLazySearchUserQuery, useTransactionHistoryQuery, useUpdateUserMutation } = userApi;