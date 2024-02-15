import React from 'react'
import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import RatingComponent from '../../_components/RatingComponent'
import ServiceListComponent from '../../_components/ServiceListComponent'
import ServiceProviderInterface from '../../_interface/ServiceProviderInterface'
import ServiceInterface from '../../_interface/ServiceInterface'
// import NavBar from '@/app/component/narbar'
import BankInformation from '../../_components/BankInformation'
import { saveEditButtonProps } from '../../_interface/ButtonPropsInterface'
import SmallButtonComponent from '../../_components/SmallButtonComponent'

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
      <div className='flex m-[50px] items-center'>
        <div className='max-w-[300px] m-[40px] space-y-[10px] float-left m-auto mt-[0px] items-top'>
          <ProfilePictureComponent/>
          {/* <h1 className='text-[32px]' >{mockingProvider.Name}</h1>
          <RatingComponent Rating = {mockingProvider.Rating}/>
          <p className='text-[18px]'>{mockingProvider.Description}</p> */}
          <SmallButtonComponent ButtonProps={saveEditButtonProps}></SmallButtonComponent>
        </div>
        <div className='max-w-[600px] w-[600px] m-[40px] float-right m-auto space-y-[30px] mt-[0px]'>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Username</span>
            <input type='username' className='mt-1 block w-full rounded-md border-gray-600 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
            placeholder='username' />
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Description</span>
            <textarea  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-[200px] p-2'
            />
          </div>
          <div className = "my-2">
            <p>Additinal Image</p>
            <form className="md:flex pl-9 md:pl-0 ">
              <button className="border-2" type='button'>upload Image</button>
            </form>
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Address</span>
            <input type='address' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder='address'/>
          </div>
          <div className = "my-2 w-[75%]">
            <span className='text-gray-700'>Phone Number</span>
            <input type='phoneNumber' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder='099-xxx-xxxx'/>
          </div>
          <BankInformation/>
        </div>
      </div>

    </div>
  )
}
