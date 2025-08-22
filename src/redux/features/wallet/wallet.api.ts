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


        withdraw: builder.mutation({
            query: (withdrawData: { amount: number }) => ({
                url: "/wallets/withdraw",
                method: "POST",
                data: withdrawData
            })
        }),


        sendMoney: builder.mutation({
            query: (sendMoneyData) => ({
                url: "/wallets/send-money",
                method: "POST",
                data: sendMoneyData
            })
        }),






    })
})


export const { useDepositMutation, useWithdrawMutation, useSendMoneyMutation } = walletApi;