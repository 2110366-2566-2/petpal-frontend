import React from 'react'
import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import RatingComponent from '../../_components/RatingComponent'
import ServiceListComponent from '../../_components/ServiceListComponent'
import ServiceProviderInterface from '../../_interface/ServiceProviderInterface'
import ServiceInterface from '../../_interface/ServiceInterface'
// import NavBar from '@/app/component/narbar'
import PetInformation from '../../_components/PetInformation'
import BankInformation from '../../_components/BankInformation'
import SmallButtonComponent from '../../_components/SmallButtonComponent'
import { editProfileButtonProps, saveEditButtonProps } from '../../_interface/ButtonPropsInterface'


export default function Profile() {
    

  let isOpen = false;
  return (
    <div className='items-center'>
      <div className='flex m-[50px] items-center'>
        <div className='max-w-[300px] space-y-[10px] float-left m-auto mt-[0px] items-top'>
          <ProfilePictureComponent/>
          <div className='grid grid-cols-1 gap-[16px]'>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
          </div>
        </div>
        <div className='max-w-[600px] w-[600px] float-right m-auto space-y-[30px] mt-[0px]'>
          <div className = "my-2 w-[75%]">
            <span className='text-black font-bold text-[32px]'>Username</span>
            <input type='username' className='mt-1 block w-[435px] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            placeholder='username' />
          </div>
          <div className = "my-2 w-[75%]">
            <PetInformation/>
          </div>
          <BankInformation/>
          
        </div>
      </div>

    </div>
  )
}
