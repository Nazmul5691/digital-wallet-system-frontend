import { baseApi } from "@/redux/baseApi";


export const walletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        deposit: builder.mutation({
            query: (depositData: { amount: number }) => ({
                url: "/wallets/deposit",
                method: "POST",
                data: depositData, // axios expects 'data', not 'body'
            }),
        }),


        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),


        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            // transformResponse: (response: any) => response.data,
            providesTags: ["USER"]
        }),


        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["USER"]
        }),

    })
})


export const { useDepositMutation, useRegisterMutation, useUserInfoQuery, useLogoutMutation } = walletApi;