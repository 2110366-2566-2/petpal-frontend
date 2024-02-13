import React from 'react'

import NavBar from '@/app/_component/navbar'
import ProfilePictureComponent from '../_components/ProfilePictureComponent'
import RatingComponent from '../_components/RatingComponent'
import ServiceListComponent from '../_components/ServiceListComponent'
import AdditionalImageComponent from '../_components/AdditionalImageComponent'

import ServiceInterface from '../_interface/ServiceInterface'

import { exampleProvider } from '../_interface/ServiceProviderInterface'


let items = [
  {name : "Listing" , link : "/listing"},
  {name : "Booking" , link : "/booking"},
  {name : "Profile" , link : "/profile"}
]

export default function Profile() {
  var provider = exampleProvider
  return (
    <div className='items-center'>
      <NavBar brandName="Petpal" navItems = {items}></NavBar>
      <div className='flex mx-auto my-[50px] grid-cols-2 items-center font-[Inter] max-w-[1000px] text-[18px]'>
        <div className='max-w-[300px] m-[40px] space-y-[10px] float-left m-auto mt-[0px] items-top'>
          <ProfilePictureComponent/>
          <h1 className='text-[32px]' ><b>{provider.Name}</b></h1>
          <RatingComponent Rating = {provider.Rating}/>
          <p className='text-[18px]'>{provider.Description}</p>
        </div>
        <div className='max-w-[600px] w-[600px] m-[40px] float-right m-auto space-y-[30px] mt-[0px]'>
          <AdditionalImageComponent></AdditionalImageComponent>
          <div className = "space-y-[10px]">
            <p><b>Address:</b> {provider.Address}</p>
            <p><b>Phone:</b> {provider.PhoneNumber}</p>
          </div>
          <div className='space-y-[15px]'>
            <h1 className='text-[32px] '><b>Service Listing</b></h1>
            <div className='flex space-x-[15px]'>
              {provider.ServiceList.map((Service:ServiceInterface) => <ServiceListComponent Service={Service}></ServiceListComponent>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
