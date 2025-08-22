import { baseApi } from "@/redux/baseApi";


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
        })
        
    })
})


export const {  useUserInfoQuery, useLazySearchUserQuery } = userApi;