'use client'

import React, { useState,useEffect } from 'react'
import ProfilePictureComponent from '@app/(routes)/profile/_components/ProfilePictureComponent'
import RatingComponent from '@app/(routes)/profile/_components/RatingComponent'
import ServiceListComponent from '@app/(routes)/profile/_components/ServiceListComponent'
import ServiceProviderInterface from '@app/(routes)/profile/_interface/ServiceProviderInterface'
import ServiceInterface from '@app/(routes)/profile/_interface/ServiceInterface'
import { saveEditButtonProps, editProfileButtonProps } from '@app/(routes)/profile/_interface/ButtonPropsInterface'
import SmallButtonComponent from '@app/(routes)/profile/_components/SmallButtonComponent'
import FetchBankInformation from '@app/(routes)/profile/_components/FetchedBankInformation'
import { getCurrentEntity } from '@/app/libs/user/userBackend'


export default function EditProfile() {

  const [username , setUsername] = useState('')
  const [description , setDescription] = useState('')
  const [address , setAddress] = useState('')
  const [phoneNumber , setPhoneNumber] = useState('')



  useEffect(()=>{
    const fetchData = async() =>{
      const entity = await getCurrentEntity()
      console.log('entity: ',entity)
      setUsername(entity.SVCPUsername || "")
      setDescription(entity.description || "")
      setAddress(entity.address || "")
      setPhoneNumber(entity.phoneNumber || "")
    }
    fetchData()
  },[])

  const handleSubmit = () =>{
    return
  }

  return (
    <div className='items-center'>
      <div className=' md:flex m-[50px] items-center '>
        <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top md:mr-[10px]'>
          <ProfilePictureComponent />
          <div className='hidden md:grid grid-cols-1 gap-[16px]'>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working={false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
          </div>
        </div>
        <div className='w-[100%] md:max-w-[600px]   float-right m-auto space-y-[30px] mt-[0px] mb-[20px] md:ml-[10px]'>
          <div className="my-2 ">
            <span className='text-black font-bold text-[32px]'>Username</span>
            <input type='username' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            placeholder='username' />
          </div>
          <div className="my-2 ">
            <span className='text-black font-bold text-[32px]'>Description</span>
            <textarea className='mt-1 block w-full rounded-md border-gray-300 shadow-sm border-[#D9D9D9] border-[3px]
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-[200px] p-2'
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            />
          </div>
          <div className="my-2">
            <span className='text-black font-bold text-[32px]'>Additional Image</span>
            <form className="md:flex md:pl-0 ">
              <button className="bg-[#D9D9D9] w-[158px] h-[45px] rounded-[10px] text-[18px] text-center p-[5px]" type='button'>Upload Image</button>
            </form>
          </div>
          <div className="my-2 ">
            <span className='text-black font-bold text-[32px]'>Address</span>
            <input type='address' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            value={address}
            onChange={(e) => {setAddress(e.target.value)}}
            placeholder='123 Wangmai Pathumwan Bangkok' />
          </div>
          <div className="my-2 ">
            <span className='text-black font-bold text-[32px]'>Phone Number</span>
            <input type='phoneNumber' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
            placeholder='099-xxx-xxxx' />
          </div>
          <div><FetchBankInformation/></div>
        </div>
        <div className='w-[100%] grid grid-cols-1 gap-[16px] md:hidden '>
          <SmallButtonComponent ButtonProps={editProfileButtonProps} Working={false}></SmallButtonComponent>
          <SmallButtonComponent ButtonProps={saveEditButtonProps} onClick={}></SmallButtonComponent>
        </div>
      </div>

    </div>
  )
}
