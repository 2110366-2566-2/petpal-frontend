import React from 'react'
import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import RatingComponent from '../../_components/RatingComponent'
import ServiceListComponent from '../../_components/ServiceListComponent'
import ServiceProviderInterface from '../../_interface/ServiceProviderInterface'
import ServiceInterface from '../../_interface/ServiceInterface'
// import NavBar from '@/app/component/narbar'
import BankInformation from '../../_components/BankInformation'
import { saveEditButtonProps , editProfileButtonProps } from '../../_interface/ButtonPropsInterface'
import SmallButtonComponent from '../../_components/SmallButtonComponent'


export default function Profile() {
  

  return (
    <div className='items-center'>
      <div className='flex m-[50px] items-center'>
        <div className='max-w-[300px] m-[40px] space-y-[10px] float-left m-auto mt-[0px] items-top'>
          <ProfilePictureComponent/>
          <div className='grid grid-cols-1 gap-[16px]'>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
          </div>
        </div>
        <div className='max-w-[600px] w-[600px] m-[40px] float-right m-auto space-y-[30px] mt-[0px]'>
          <div className = "my-2 w-[75%]">
            <span className='text-black font-bold text-[32px]'>Username</span>
            <input type='username' className='mt-1 block w-[435px] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            placeholder='username' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-black font-bold text-[32px]'>Description</span>
            <textarea  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm border-[#D9D9D9] border-[3px]
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-[200px] p-2'
            />
          </div>
          <div className = "my-2">
          <span className='text-black font-bold text-[32px]'>Additional Image</span>
            <form className="md:flex pl-9 md:pl-0 ">
              <button className="bg-[#D9D9D9] w-[158px] h-[45px] rounded-[10px] text-[18px] text-center p-[5px]" type='button'>Upload Image</button>
            </form>
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-black font-bold text-[32px]'>Address</span>
            <input type='address' className='mt-1 block w-[435px] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            placeholder='123 Wangmai Pathumwan Bangkok' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-black font-bold text-[32px]'>Phone Number</span>
            <input type='phoneNumber' className='mt-1 block w-[435px] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            placeholder='099-xxx-xxxx' />
          </div>
          <BankInformation/>
        </div>
      </div>

    </div>
  )
}
