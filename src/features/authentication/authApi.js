import { mainApi } from '../../app/mainApi'



export const authAPi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        userLogin: builder.mutation({
            query: (body)=> ({
                url: '/users/login',
                method: 'POST',
                body: body
            })
        }),

        userSignup: builder.mutation({
            query: (body) => ({
                url: '/users/register',
                method: 'POST',
                body: body
            })
        })




    })


})

export const {useUserLoginMutation, useUserSignupMutation} = authAPi;