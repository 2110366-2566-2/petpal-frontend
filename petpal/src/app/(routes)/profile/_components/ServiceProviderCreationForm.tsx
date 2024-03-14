'use client'
import React from 'react'
import ProfilePictureComponent from '../_components/ProfilePictureComponent'
import RatingComponent from '../_components/RatingComponent'
import ServiceListComponent from '../_components/ServiceListComponent'
import ServiceProviderInterface from '../_interface/ServiceProviderInterface'
import ServiceInterface from '../_interface/ServiceInterface'
// import NavBar from '@/app/component/narbar'
import BankEditInformation from '../_components/BankEditInformation'
import FetchedBankInformation from '../_components/FetchedBankInformation'
import { saveEditButtonProps , editProfileButtonProps } from '../_interface/ButtonPropsInterface'
import SmallButtonComponent from '../_components/SmallButtonComponent'


export default function ServiceProviderCreationForm() {

    return (
      <div className='items-center'>
        <div className=' md:flex m-[50px] items-center '>
          <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top'>
            <ProfilePictureComponent/>
            <div className='hidden md:grid grid-cols-1 gap-[16px]'>
              <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
              <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
            </div>
          </div>
          <div className='w-[100%] md:max-w-[600px]   float-right m-auto space-y-[30px] mt-[0px] mb-[20px]'>
            <div className = "my-2 ">
              <span className='text-black font-bold text-[20px]'>Username</span>
              <input type='username' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
              border-gray border-[3px]'
              placeholder='username' />
            </div>
            <div className = "my-2 ">
              <span className='text-black font-bold text-[20px]'>Description</span>
              <textarea  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm border-gray border-[3px]
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-[200px] p-2'
              />
            </div>
            <div className = "my-2">
            <span className='text-black font-bold text-[20px]'>Additional Image</span>
              <form className="md:flex md:pl-0 ">
                <button className="bg-gray w-[150px] h-[30px] rounded-[10px] text-[16px] text-center p-[5px]" type='button'>Upload Image</button>
              </form>
            </div>
            <div className = "my-2 ">
              <span className='text-black font-bold text-[20px]'>Address</span>
              <input type='address' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
              border-gray border-[3px]'
              placeholder='123 Wangmai Pathumwan Bangkok' />
            </div>
            <div className = "my-2 ">
              <span className='text-black font-bold text-[20px]'>Phone Number</span>
              <input type='phoneNumber' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
              border-gray border-[3px]'
              placeholder='099-xxx-xxxx' />
            </div>
            <FetchedBankInformation/>
          </div>
          <div className='w-[100%] grid grid-cols-1 gap-[16px] md:hidden '>
              <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
              <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
          </div>
        </div>
  
      </div>
    )
  }