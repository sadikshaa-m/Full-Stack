
import { mainApi } from "../../app/mainApi";


//mainApi is the base API connection - server sanga connected cha


//injectENdpoints le mainAPi ma naya endpoints add garni function ho 
const orderApi = mainApi.injectEndpoints({

    endpoints: (builder) => ({

        //fetch data and send token
        getOrders: builder.query({
            query: (token) => ({
                url: '/orders',
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }),
            providesTags: ['Order']
        }),


        getOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'GET',
            }),
            providesTags: ['Order']
        }),



        createOrder: builder.mutation({
            //change data , automatically refresh UI
            query: (data) => ({
                url: '/orders',
                method: 'POST',
                headers: {
                    Authorization: data.token
                },
                //server ma pathauni data 
                body: data.body
            }),
            invalidatesTags: ['Order']
        }),


    })
});

export const {useCreateOrderMutation, useGetOrdersQuery, useGetOrderQuery} = orderApi;