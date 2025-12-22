// import React, { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { NavLink, useNavigate } from 'react-router'
// import { useUserLoginMutation, useUserSignupMutation } from './authApi'
// import { Formik } from 'formik'
// import * as Yup from 'yup'
// import { LockKeyhole, LockKeyholeOpenIcon } from 'lucide-react'

// const signupSchema = Yup.object({
//     username: Yup.string().required(),
//     email: Yup.string().email().required(),
//     password: Yup.string().min(5).required(),
//     confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Confirm password is required"),

// })


// export default function Register() {

//     const nav = useNavigate();
//     const [show, setShow] = useState(false);
//     const [userSignup, { isLoading }] = useUserSignupMutation();

//     return (
//         <div className='p-5'>
//             <Card className='w-full max-w-md shadow-2xl'>
//                 <CardHeader className='text-3xl justify-items-center'>
//                     <CardTitle>Create an account</CardTitle>
//                     <CardDescription className='text-gray-500 text-[15px]'>Join us today - it's free!</CardDescription>
//                 </CardHeader>

//                 <CardContent>
//                     {/*formik tracks fields by name not id */}
//                     <Formik
//                         initialValues={{
//                             username: '',
//                             email: '',
//                             password: '',
//                             confirmPassword: ''
//                         }}
//                         onSubmit={async (val) => {
//                             try {
//                                 await userSignup(val).unwrap();
//                                 toast.success('Register successful');
//                                 nav(-1);


//                             } catch (err) {
//                                 toast.error(err.data.data);
//                             }
//                         }}
//                         validationSchema={signupSchema}
//                     >
//                         {({ values, handleChange, errors, touched, handleSubmit }) => (
//                             <form onSubmit={handleSubmit}>
//                                 <div className="flex flex-col gap-6">
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="username">Full Name</Label>
//                                         <Input name='username' id="username" type="text" placeholder="John Doe"
//                                             onChange={handleChange}
//                                             value={values.username}
//                                         />
//                                         {
//                                             errors.username && touched.username && <p className='text-rose-500'>{errors.username}</p>
//                                         }
//                                     </div>

//                                     <div className="grid gap-2">
//                                         <Label htmlFor="email">Email</Label>
//                                         <Input name='email' id="email" type="email" placeholder="you@example.com"
//                                             onChange={handleChange}
//                                             value={values.email}
//                                         />
//                                         {
//                                             errors.email && touched.email && <p className='text-rose-500'>{errors.email}</p>
//                                         }
//                                     </div>

//                                     <div className="grid gap-2">
//                                         <div className="flex items-center justify-between">
//                                             <Label htmlFor="password">Password</Label>
//                                         </div>
//                                         <Input id="password"
//                                             name='password' type={show ? 'text' : 'password'} placeholder="••••••••"
//                                             value={values.password}
//                                             onChange={handleChange}
//                                         />
//                                         <Button
//                                             type='button'
//                                             onClick={() => setShow(!show)}
//                                             variant='ghost'
//                                             size='icon'
//                                             className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
//                                         >

//                                             {show ? <LockKeyholeOpenIcon /> : <LockKeyhole />}


//                                             <span className='sr-only'>Show password</span>
//                                         </Button>
//                                     </div>
//                                     {
//                                         errors.password && touched.password && <p className='text-rose-500'>{errors.password}</p>
//                                     }

//                                     <div className='grid gap-2'>
//                                         <div className="flex items-center justify-between">
//                                             <Label htmlFor="password">Confirm Password</Label>
//                                         </div>
//                                         <Input name='confirmPassword' id="confirmPassword" type={show? 'text': 'password'} placeholder="••••••••"
//                                             value={values.confirmPassword}
//                                             onChange={handleChange} />
                                            
//                                         <Button
//                                             type='button'
//                                             onClick={() => setShow(!show)}
//                                             variant='ghost'
//                                             size='icon'
//                                             className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
//                                         >

//                                             {show ? <LockKeyholeOpenIcon /> : <LockKeyhole />}


//                                             <span className='sr-only'>Show password</span>
//                                         </Button>
//                                         {
//                                             errors.confirmPassword && touched.confirmPassword && <p className='text-rose-500'>{errors.confirmPassword}</p>
//                                         }
//                                     </div>
//                                 </div>

//                                 <Button type='submit' className='w-full mt-5 bg-blue-600 text-white tracking-wider'>
//                                     Sign Up
//                                 </Button>

//                             </form>
//                         )}
//                     </Formik>

//                 </CardContent>

//                 <CardFooter className='flex-col gap-2'>
//                     <Button variant='outline' className='w-full'>
//                         Sign Up with Google
//                     </Button>
//                     <div className='mt-4 text-center text-sm'>
//                         Already have an account?{' '}
//                         <NavLink to='/login' className='underline underline-offset-4'>
//                             Login
//                         </NavLink>
//                     </div>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }









import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NavLink, useNavigate } from 'react-router'
import { useUserSignupMutation } from './authApi'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { LockKeyhole, LockKeyholeOpenIcon } from 'lucide-react'
import toast from 'react-hot-toast'
  // ✅ IMPORT ADDED

// ✅ STRONGER SCHEMA
const signupSchema = Yup.object({
  username: Yup.string().min(3, 'Too short').required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(5, 'Minimum 5 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
})

export default function Register() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [userSignup, { isLoading }] = useUserSignupMutation();

  return (
    <div className='p-5 flex justify-center'>
      <Card className='w-full max-w-md shadow-2xl'>
        <CardHeader className='text-3xl text-center'>
          <CardTitle>Create an account</CardTitle>
          <CardDescription className='text-gray-500 text-[15px]'>
            Join us today - it's free!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={signupSchema}
            onSubmit={async (val, { resetForm }) => {
              try {
                await userSignup(val).unwrap();
                toast.success('Register successful ✅');
                resetForm();
                nav('/login');
              } catch (err) {
                toast.error(
                  err?.data?.message || 
                  err?.data?.data || 
                  'Registration failed'
                );
              }
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* ✅ FULL NAME */}
                <div className="grid gap-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input
                    name='username'
                    id="username"
                    type="text"
                    placeholder="John Doe"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username &&
                    <p className='text-rose-500 text-sm'>{errors.username}</p>}
                </div>

                {/* ✅ EMAIL */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name='email'
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email &&
                    <p className='text-rose-500 text-sm'>{errors.email}</p>}
                </div>

                {/* ✅ PASSWORD */}
               <div className='w-full max-w-xs space-y-2'>
                                   <Label>Password</Label>
                                   <div className='relative'>
                                     <Input
                                       onChange={handleChange}
                                       onBlur= {handleBlur}
                                       value={values.password}
                                       type={show ? 'text' : 'password'}
                                       name='password' placeholder='******' className='pr-9' />
               
                                     <Button
                                       type='button'
                                       onClick={() => setShow(!show)}
                                       variant='ghost'
                                       size='icon'
                                       className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                                     >
               
                                       {show ? <LockKeyholeOpenIcon /> : <LockKeyhole />}
               
               
                                       <span className='sr-only'>Show password</span>
                                     </Button>
                                   </div>
                                   {errors.password && touched.password && <p className="text-red-500">
                                     {errors.password}
                                   </p>}
                                 </div>
               
               
               
                               

                {/* ✅ CONFIRM PASSWORD */}
                <div className='w-full max-w-xs space-y-2'>
                                   <Label>Confirm Password</Label>
                                   <div className='relative'>
                                     <Input
                                       onChange={handleChange}
                                       onBlur= {handleBlur}
                                       value={values.confirmPassword}
                                       type={show ? 'text' : 'password'}
                                       name='confirmPassword' placeholder='******' className='pr-9' />
               
                                     <Button
                                       type='button'
                                       onClick={() => setShow(!show)}
                                       variant='ghost'
                                       size='icon'
                                       className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                                     >
               
                                       {show ? <LockKeyholeOpenIcon /> : <LockKeyhole />}
               
               
                                       <span className='sr-only'>Show password</span>
                                     </Button>
                                   </div>
                                   {errors.confirmPassword && touched.confirmPassword && 
                                   <p className="text-red-500">
                                     {errors.confirmPasswordPassword}
                                   </p>}
                                 </div>
               

                {/* ✅ SUBMIT */}
                {isLoading ? <Button size="sm" variant="outline" disabled className="w-full mt-5">
                                 <Spinner />
                                 Submit
                               </Button> : <Button type="submit" className="w-full mt-5">
                                 Sign Up
                               </Button>}

              </form>
            )}
          </Formik>
        </CardContent>

        <CardFooter className='flex-col gap-2'>
          <Button variant='outline' className='w-full'>
            Sign Up with Google
          </Button>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <NavLink to='/login' className='underline underline-offset-4'>
              Login
            </NavLink>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
