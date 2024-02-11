import React from 'react'
import ProfilePictureComponent from '../_components/ProfilePictureComponent'
import RatingComponent from '../_components/RatingComponent'
import ServiceListComponent from '../_components/ServiceListComponent'
import ServiceProviderInterface from '../_interface/ServiceProviderInterface'
import ServiceInterface from '../_interface/ServiceInterface'

var mockingServiceType1:ServiceInterface = {
  Name:"serviceName1",
  Type:"type1",
  StartDate:new Date(),
  EndDate:new Date(),
  Price:500,
}

var mockingServiceType2:ServiceInterface = {
  Name:"serviceName2",
  Type:"type2",
  StartDate:new Date(),
  EndDate:new Date(),
  Price:5000,
}

var mockingProvider:ServiceProviderInterface = {
  Name:"Provider Name",
  Rating:2.5,
  Description:"For business description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac quam lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis egestas odio non neque scelerisque, ut dignissim nisi vehicula. Aenean porta nunc enim, cursus maximus tellus hendrerit id.",
  Address:"61 Wireless Road , Lumpini, Pathumwan The Athenee Hotel, Bangkok 10330 Thailand",
  PhoneNumber:"0987654321",
  ServiceList:[
    mockingServiceType1,mockingServiceType2
  ]
}

export default function Profile() {
  return (
    <div className='items-center'>
      Navbar
      <div className='flex m-[50px] flow-root items-center'>
        <div className='max-w-[300px] m-[40px] space-y-[10px] float-left'>
          <ProfilePictureComponent/>
          <h1 className='text-[32px]' >{mockingProvider.Name}</h1>
          <RatingComponent Rating = {mockingProvider.Rating}/>
          <p className='text-[18px]'>{mockingProvider.Description}</p>
        </div>
        <div className='max-w-[600px] m-[40px] float-right'>
          <p>Address: {mockingProvider.Address}</p>
          <p>Phone : {mockingProvider.PhoneNumber}</p>
          <h1 className='text-[32px] '>Service Listing</h1>
          <div className='flex space-x-[10px]'>
            {mockingProvider.ServiceList.map((Service:ServiceInterface) => <ServiceListComponent Service={Service}></ServiceListComponent>)}
          </div>
        </div>
      </div>

    </div>
  )
}
