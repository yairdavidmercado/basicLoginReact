import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/api/users',
            keepUnusedDataFor: 5
        }),
        getUserById: builder.query({
            query: (id) => `/api/user/${id}`,
            keepUnusedDataFor: 5
        })
    })
})

export const {
    useGetUsersQuery, useGetUserByIdQuery
} = usersApiSlice