'user client'

import React from 'react'
import ProfilePictureComponent from "@app/(routes)/profile/_components/ProfilePictureComponent"
import RatingComponent from "@app/(routes)/profile/_components/RatingComponent"
import ServiceListComponent from "@app/(routes)/profile/_components/ServiceListComponent"
import ServiceProviderInterface from "@app/(routes)/profile/_interface/ServiceProviderInterface"
import ServiceInterface from "@app/(routes)/profile/_interface/ServiceInterface"
import PetInformation from "@app/(routes)/profile/_components/PetInformation"
import FetchBankInformation from "@app/(routes)/profile/_components/FetchedBankInformation"
import SmallButtonComponent from "@app/(routes)/profile/_components/SmallButtonComponent"
import { editProfileButtonProps, saveEditButtonProps } from "@app/(routes)/profile/_interface/ButtonPropsInterface"
import { useState, useEffect } from 'react'

export default function EditProfile() {

  return (
    <div className='items-center'>
      <div className='md:flex m-[50px] items-center'>
        <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] md:mr-3 items-top'>
          <ProfilePictureComponent />
          <div className='hidden md:grid grid-cols-1 gap-[16px]'>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working={false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
          </div>
        </div>
        <div className='w-[100%] md:max-w-[600px]  md:float-right m-auto space-y-[30px] mt-[0px] mb-[20px]'>
          <div className="my-2 ">
            <span className='text-black font-bold text-[20px]'>Username</span>
            <input type='username' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-gray border-[3px]'
              placeholder='username' />
          </div>
          <div className="my-2 ">
            <PetInformation />
          </div>
          <FetchBankInformation />
        </div>
        <div className='w-[100%] grid grid-cols-1 gap-[16px] md:hidden '>
          <SmallButtonComponent ButtonProps={editProfileButtonProps} Working={false}></SmallButtonComponent>
          <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
        </div>
      </div>

    </div>
  )
}
