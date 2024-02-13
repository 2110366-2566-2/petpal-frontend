import React from 'react'

import UserInterface from '../_interface/UserInterface'
import PetInterface from '../_interface/PetInterface'

import ProfilePictureComponent from '../_components/ProfilePictureComponent'
import NavBar from '@/app/_component/navbar'
import SmalllPetListComponent from '../_components/SmalllPetListComponent'

let items = [
  {name : "Listing" , link : "/listing"},
  {name : "Booking" , link : "/booking"},
  {name : "Profile" , link : "/profile"}
]

var MockPet1:PetInterface = {
  Name:"Longtuu",
  Type:"Cat"
}

var MockPet2:PetInterface = {
  Name:"LongPoom",
  Type:"Dog"
}

var MockUser:UserInterface = {
  Name:"Prame",
  PetList:[
    MockPet1,
    MockPet2
  ]
}

export default function Profile() {
  return (
    <div className='items-center'>
    <NavBar brandName="Petpal" navItems = {items}></NavBar>
    <div className='flex mx-auto my-[50px] grid-cols-2 items-center font-[Inter] max-w-[1000px] text-[18px]'>
      <div className='max-w-[300px] m-[40px] space-y-[10px] float-left m-auto mt-[0px] items-top'>
        <ProfilePictureComponent/>
        <h1 className='text-[32px]' ><b>{MockUser.Name}</b></h1>
      </div>
      <div className='max-w-[600px] w-[600px] m-[40px] float-right m-auto space-y-[30px] mt-[0px]'>
        <h1 className='font-bold text-[32px]'>Pets</h1>
        <div>
          {MockUser.PetList.map((Pet:PetInterface) => <SmalllPetListComponent Pet={Pet}></SmalllPetListComponent>)}
        </div>
      </div>
    </div>
  </div>
  )
}
