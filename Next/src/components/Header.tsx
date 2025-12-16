import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between items-center   bg-zinc-400 text-white p-2 mb-3'>
      <h1 className='text-2xl font-bold'>Logo</h1>

      <nav className='space-x-5 '>
        
      <Link href={'/employees/add'} className='hover:text-pink-200'>Add Employee</Link>
      <Link href={'/posts'} className='hover:text-pink-200'>Posts</Link>
      <Link href={'/about'} className='hover:text-pink-200'>About</Link>
      <Link href={'/contact'} className='hover:text-pink-200'>Contact</Link>
      </nav>
      
    </div>
  )
}
