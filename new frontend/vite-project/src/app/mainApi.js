import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const base = 'https://full-stack-2-7o27.onrender.com'

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://full-stack-2-7o27.onrender.com/api'}),
    endpoints: (builder) => ({})

});

//192.168.1.68