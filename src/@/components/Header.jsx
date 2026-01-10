import React from 'react'
import DropDownProfile from './DropDownProfile'
import { Button } from './ui/button'
import { NavLink } from 'react-router'
import { useSelector } from 'react-redux';

export default function Header() {
   const { user } = useSelector((state) => state.userSlice);

  return (
    <div className='bg-gray-400 px-5 flex items-center justify-between'>
        <h1 className='text-[30px] font-bold tracking-wider py-1'>Shop</h1>

        
      {user ? <DropDownProfile user={user} /> : <div className="space-x-5">
        
          <NavLink to={'/login'}>
            <Button variant="link">Login</Button>
            </NavLink>
            <NavLink to={'/signup'}>
            <Button className="bg-black text-white">Sign Up</Button>
            </NavLink> 
      </div>}
     </div>

  )
}
