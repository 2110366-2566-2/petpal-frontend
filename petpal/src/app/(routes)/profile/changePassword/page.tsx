import React from 'react'
import ProfilePictureComponent from "@app/(routes)/profile/_components/ProfilePictureComponent"
import SmallButtonComponent from "@app/(routes)/profile/_components/SmallButtonComponent"
import { editProfileButtonProps,saveEditButtonProps } from "@app/(routes)/profile/_interface/ButtonPropsInterface"

export default function changePassword() {
  
  return (
    <div className='items-center'>
      <div className='md:flex m-[50px] items-center'>
        <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top'>
          <ProfilePictureComponent/>
          <div className='hidden md:grid grid-cols-1 gap-[16px]'>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
          </div>
        </div>
        <div className='w-[100%] md:max-w-[600px]   md:float-right m-auto space-y-[30px] mt-[0px] mb-[20px]'>
          <div className = "my-2">
          <span className='text-black font-bold text-[32px]'>Change Password</span>
            <input type='password' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
             />
          </div>
        </div>
        <div className='w-[100%] grid grid-cols-1 gap-[16px] md:hidden '>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
        </div>
      </div>

    </div>
  )
}
