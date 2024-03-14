import React from 'react'
import { usePathname } from 'next/navigation';

import UserInterface from '../../_interface/UserInterface'
import PetInterface from '../../_interface/PetInterface'
import ButtonPropsInterface from '../../_interface/ButtonPropsInterface'

import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import SmalllPetListComponent from '../../_components/SmalllPetListComponent'
import SmallButtonComponent from '../../_components/SmallButtonComponent'

import createButtonList from '../../_utils/createButtonList';

import { exampleUser } from '../../_interface/UserInterface'
import { editProfileButtonProps,chagnePasswordButtonProps } from '../../_interface/ButtonPropsInterface'

export default function EmailUserProfile({params}:{params:{email:string}}) {
  var User:UserInterface = exampleUser
  var email:string = params.email

  var buttonPropsList:ButtonPropsInterface[] = [editProfileButtonProps,chagnePasswordButtonProps]
  
  const MY_EMAIL:string = "me"
  var showButton:boolean = email === MY_EMAIL
  
  return (
    <div className='items-center'>
      <div className='md:flex items-top p-[20px] m-auto md:max-w-[1100px]'>
        <div className='max-w-[300px] m-auto space-y-[10px] md:float-left mt-[0px] md:mr-[10px]'>
          <ProfilePictureComponent/>
          <div className='hidden md:block'>
              {createButtonList(showButton,buttonPropsList=buttonPropsList)}
          </div>
        </div>
        <div className='max-w-[300px] md:max-w-[600px] mx-[auto] md:mt-[0px] pt-[20px] md:float-right space-y-[30px] md:ml-[10px]'>
          <h1 className='font-bold text-[32px]'>Pets</h1>
          <div>
            {User.PetList.map((Pet:PetInterface) => <SmalllPetListComponent Pet={Pet} key = {Pet.Name}></SmalllPetListComponent>)}
          </div>
          <div className='md:hidden block'>
              {createButtonList(showButton,buttonPropsList=buttonPropsList)}
            </div>
        </div>
      </div>
    </div>
  )
}
