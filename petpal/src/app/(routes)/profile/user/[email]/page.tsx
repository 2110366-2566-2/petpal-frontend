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

export default function EmailUserProfile({params}:{params:{email:string}}) {
  var User:UserInterface = exampleUser
  var email:string = params.email
  return (
    <div className='items-center'>
    <div className='flex mx-auto my-[50px] grid-cols-2 items-center max-w-[1000px] text-[18px]'>
      <div className='max-w-[300px] m-[40px] space-y-[10px] float-left  mt-[0px] items-top'>
        <ProfilePictureComponent/>
        <h1 className='text-[32px]' ><b>{User.Name}</b></h1>
        {(email == "me") ?(
            <div className='space-y-[20px] block'>
              <SmallButtonComponent ButtonProps={editProfileButtonProps}></SmallButtonComponent>
              <SmallButtonComponent ButtonProps={chagnePasswordButtonProps}></SmallButtonComponent>
            </div>
          ):(<></>)
          }
      </div>
      <div className='max-w-[600px] w-[600px] m-[40px] float-right space-y-[30px] mt-[0px]'>
        <h1 className='font-bold text-[32px]'>Pets</h1>
        <div>
          {User.PetList.map((Pet:PetInterface) => <SmalllPetListComponent Pet={Pet} key = {Pet.Name}></SmalllPetListComponent>)}
        </div>
      </div>
    </div>
  </div>
  )
}
