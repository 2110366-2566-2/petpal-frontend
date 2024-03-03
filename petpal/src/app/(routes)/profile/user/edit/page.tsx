import React from 'react'
import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import RatingComponent from '../../_components/RatingComponent'
import ServiceListComponent from '../../_components/ServiceListComponent'
import ServiceProviderInterface from '../../_interface/ServiceProviderInterface'
import ServiceInterface from '../../_interface/ServiceInterface'
// import NavBar from '@/app/component/narbar'
import PetInformation from '../../_components/PetInformation'
import BankInformation from '../../_components/FetchedBankInformation'
import SmallButtonComponent from '../../_components/SmallButtonComponent'
import { editProfileButtonProps, saveEditButtonProps } from '../../_interface/ButtonPropsInterface'


export default function Profile() {
    

  let isOpen = false;
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
        <div className='w-[100%] md:max-w-[600px]  md:float-right m-auto space-y-[30px] mt-[0px] mb-[20px]'>
          <div className = "my-2 ">
            <span className='text-black font-bold text-[20px]'>Username</span>
            <input type='username' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-gray border-[3px]'
            placeholder='username' />
          </div>
          <div className = "my-2 ">
            <PetInformation/>
          </div>
          <BankInformation/>
        </div>
        <div className='w-[100%] grid grid-cols-1 gap-[16px] md:hidden '>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
        </div>
      </div>

    </div>
  )
}
