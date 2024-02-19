'use client'

import {useState} from "react"
import React from "react";


export default function PetInformation(){
    const [isOpen , setIsOpen] = useState(true)
    const petInfo = [
      {Name:"Pet Name" , inputType:"box"},{Name:"Animal Type" , inputType:"box"},{Name:"Breed" , inputType:"box"},
      {Name:"Gender" , inputType:"choice" ,option:["Male","Female"]},{Name:"Age" , inputType:"box"},{Name:"Health Information" , inputType:"box"},
      {Name:"Vaccination Records" , inputType:"box"},{Name:"Dietary Preference" , inputType:"box"},
      {Name:"Behavioral Note" , inputType:"box"},{Name:"Certificates" , inputType:"box"},
    ]
    return(
      <div className = "my-2 ">
            <span className='text-black font-bold text-[32px]'>Pets</span>
            {isOpen && (
              <div className='flex justify-between'>
                <p>pet name 1</p>
                <button className='border-2 rounded-full w-5 h-5 justify-center items-center flex 'onClick={() => setIsOpen(false)} >x</button>
              </div>
            )}

        <div className='h-[476px] border-[3px] rounded-md border-[#D9D9D9] overflow-y-scroll my-2 pl-2'>
          {
            petInfo.map((info) => 
              <div className = "my-2 w-[75%]">
                <span className='text-black font-bold text-[24px]'>{info.Name}</span>
                {info.inputType == 'box' &&
                  <input type={info.Name} className='mt-1 block w-full rounded-md shadow-sm
                  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary border-[#D9D9D9] border-[3px]'
                   />
                }
                {info.inputType == 'choice' &&
                  <form className="md:flex pl-9 md:pl-0 ">
                    <select>
                      {info.option?.map((opName) => 
                        <option>{opName}</option>
                      )}
                    </select>
                  </form>
                }
                
              </div>
            )
          }
          <div className='flex justify-end m-2'>
            <button className='bg-[#D9D9D9] w-[102px] rounded-[10px] text-[18px] text-center p-[5px]' onClick={()=>setIsOpen(true)}>add</button>
          </div>
        </div>
      </div>
    )
}