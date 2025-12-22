import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const base = 'http://localhost:5000'

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
    endpoints: (builder) => ({})

});

//192.168.1.68