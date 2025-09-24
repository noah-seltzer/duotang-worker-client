import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { prepareHeaders } from '@/store/api/msal/headers'

export const tagTypes = ['OneDriveFiles']

const baseQuery = retry(
    fetchBaseQuery({
        baseUrl: 'https://graph.microsoft.com/v1.0',
        prepareHeaders
    }),
    { maxRetries: 0 }
)

export const MASLApi = createApi({
    reducerPath: 'splitApi',

    baseQuery,

    tagTypes,
    
    endpoints: () => ({})
})
