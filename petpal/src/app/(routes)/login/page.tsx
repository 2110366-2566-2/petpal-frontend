"use client"
import React, { ChangeEvent, useState } from 'react'
import Button from '../register/_components/Button'

export default function Login() {
  const [registrationType, setRegistrationType] = useState('User');
  const handleRegistrationTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegistrationType(e.target.value);
  };
  return (
    <main className='flex flex-col items-center '>
    <div className='flex flex-col items-center w-[742px] h-full p-10 border-2'>
      <div className='text-[#FF872F] text-[48px] font-bold '>
        LOGIN
      </div>
      <div className='w-[75%] m-3'>
        <span className='text-gray-700'>Email address</span>
        <input type='email' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm
         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
         placeholder='skibidi@example.com'/>
      </div>   
      <div className='w-[75%] m-3'>
        <span className='text-gray-700'>Password</span>
        <input type='password' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm
         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
         placeholder='password'/>
      </div>  
      <div className='w-[75%] m-3'>
        <span className='text-gray-700'>Login as</span>
        <select className="block w-full mt-1 rounded-md border-gray-300 shadow-sm
         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
         value={registrationType}
         onChange={handleRegistrationTypeChange}>
                <option>User</option>
                <option>Service Provider</option>
        </select>
      </div>
      <Button name='LOGIN'/>
      <span className='mt-4 text-gray-700 text-[15px]'>Need an account? <a href='./register' className='underline'>SIGN UP</a></span>
    </div>
  </main>
  )
}
