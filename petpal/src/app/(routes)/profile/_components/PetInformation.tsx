'use client'

import {useState} from "react"
import React from "react";


export default function PetInformation(){
    const [isOpen , setIsOpen] = useState(true)
    return(
      <div className = "my-2 ">
            <p>Pets</p>
            {isOpen && (
              <div className='flex justify-between'>
                <p>pet name 1</p>
                <button className='border-2 rounded-full w-5 h-5 justify-center items-center flex 'onClick={() => setIsOpen(false)} >x</button>
              </div>
            )}
        <div className='h-80 border-2 overflow-y-scroll my-2 pl-2'>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Pet Name</span>
            <input type='username' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='username' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Animal Type</span>
            <input type='animalType' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='cat' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Breed</span>
            <input type='breed' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='british shorthair' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Breed</span>
            <form className="md:flex pl-9 md:pl-0 ">
                <select>
                  <option>Male</option>
                  <option>Female</option>
                </select>
            </form>
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Age</span>
            <input type='age' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='2' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Health Information</span>
            <input type='healthInformation' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='Allergic to Sadine' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Vaccinatino Records</span>
            <input type='vacinationRecords' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='HIV last week' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Dietary Preference</span>
            <input type='dietaryPref' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='Eat onlyl Sadine' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Behavioral Note</span>
            <input type='behavioralNote' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='Running every 6pm.' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Certificate</span>
            <input type='certificate' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='certificate' />
          </div>
          <div className='flex justify-end'>
            <button className='border-2' onClick={()=>setIsOpen(true)}>add</button>
          </div>
        </div>
      </div>
    )
}