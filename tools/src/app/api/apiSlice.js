import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    // crendentials: "include" will face CORS if credential is not provided
    credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers 
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token');
        //sending refresh token to get new access token

        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const email = api.getState().auth.email
            api.dispach(setCredentials({ ...refreshResult.data, email}))
            //retry the original query new access token 
            result = await baseQuery(args, api, extraOptions)
        }else {
            api.dispach(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})