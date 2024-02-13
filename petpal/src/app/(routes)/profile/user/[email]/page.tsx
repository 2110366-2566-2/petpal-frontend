import React from 'react'
import { usePathname } from 'next/navigation';

import UserInterface from '../../_interface/UserInterface'
import PetInterface from '../../_interface/PetInterface'
import ButtonPropsInterface from '../../_interface/ButtonPropsInterface'

import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import NavBar from '@/app/_component/navbar'
import SmalllPetListComponent from '../../_components/SmalllPetListComponent'
import SmallButtonComponent from '../../_components/SmallButtonComponent'

import { exampleUser } from '../../_interface/UserInterface'
import { editProfileButtonProps,chagnePasswordButtonProps } from '../../_interface/ButtonPropsInterface'

let items = [
  {name : "Listing" , link : "/listing"},
  {name : "Booking" , link : "/booking"},
  {name : "Profile" , link : "/profile"}
]

export default function EmailUserProfile() {
  var User:UserInterface = exampleUser
  return (
    <div className='items-center'>
    <NavBar brandName="Petpal" navItems = {items}></NavBar>
    <div className='flex mx-auto my-[50px] grid-cols-2 items-center font-[Inter] max-w-[1000px] text-[18px]'>
      <div className='max-w-[300px] m-[40px] space-y-[10px] float-left m-auto mt-[0px] items-top'>
        <ProfilePictureComponent/>
        <h1 className='text-[32px]' ><b>{User.Name}</b></h1>
        <div className='space-y-[20px] block'>
          <SmallButtonComponent ButtonProps={editProfileButtonProps}></SmallButtonComponent>
          <SmallButtonComponent ButtonProps={chagnePasswordButtonProps}></SmallButtonComponent>
        </div>
      </div>
      <div className='max-w-[600px] w-[600px] m-[40px] float-right m-auto space-y-[30px] mt-[0px]'>
        <h1 className='font-bold text-[32px]'>Pets</h1>
        <div>
          {User.PetList.map((Pet:PetInterface) => <SmalllPetListComponent Pet={Pet} key = {Pet.Name}></SmalllPetListComponent>)}
        </div>
      </div>
    </div>
  </div>
  )
}
