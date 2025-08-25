/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/baseApi";


export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllUsers: builder.query({
            query: (params) => ({
                url: "/user/all-users",
                method: "GET",
                params,
            }),
            providesTags: ["USER"],
        }),

        updateUserStatus: builder.mutation<any, { userId: string; isActive: string }>(
            {
                query: ({ userId, isActive }) => ({
                    url: `/user/status/${userId}`,
                    method: "PATCH",
                    data: { isActive },
                }),
                invalidatesTags: ["USER"],
            }
        ),


        getAllAgents: builder.query({
            query: (params) => ({
                url: "/user/agents", // Assuming your endpoint is /api/user/agents
                method: "GET",
                params,
            }),
            providesTags: ["AGENT"],
        }),

        // Update agent approval status
        updateAgentStatus: builder.mutation<any, { userId: string; isApproved: boolean }>(
            {
                query: ({ userId, isApproved }) => ({
                    url: `/user/agents/approval-status/${userId}`,
                    method: "PATCH",
                    data: { isApproved },
                }),
                // Invalidate the 'Agents' list to refetch the data and update the UI
                invalidatesTags: ["AGENT"],
            }
        ),


        // getAllTransactions: builder.query({
        //     query: () => ({
        //         url: "/transactions/all",
        //         method: "GET",
        //     }),
        //     providesTags: ["TRANSACTION"],
        // }),
        // getAllTransactions: builder.query<any, { page?: number; limit?: number; userId?: string; type?: string; searchTerm?: string }>({
        //     query: (params) => ({
        //         url: "/transactions/all",
        //         method: "GET",
        //         params,
        //     }),
        //     providesTags: ["TRANSACTION"],
        // }),

        getAllTransactions: builder.query<
            any, // you can type this properly later
            { page?: number; limit?: number; userId?: string; type?: string; searchTerm?: string }
        >({
            query: (params) => ({
                url: "/transactions/all",
                method: "GET",
                params,
            }),
            providesTags: ["TRANSACTION"],
        }),

    })
})


export const { useGetAllUsersQuery, useUpdateUserStatusMutation, useGetAllAgentsQuery, useUpdateAgentStatusMutation, useGetAllTransactionsQuery } = adminApi;