'use client'

import {useState} from 'react'
import React from 'react'
import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import RatingComponent from '../../_components/RatingComponent'
import ServiceListComponent from '../../_components/ServiceListComponent'
import ServiceProviderInterface from '../../_interface/ServiceProviderInterface'
import ServiceInterface from '../../_interface/ServiceInterface'
import NavBar from '@/app/component/narbar'

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
    const [isOpen, setIsOpen] = useState(false);

    function setIsOpenValue(value:boolean) {
        setIsOpen(value);
    }
  let items = [
    {name : "Listing" , link : "/listing"},
    {name : "Booking" , link : "/booking"},
    {name : "Profile" , link : "/profile"}
  ]
  let banks = [
    {id:0 , name : "None"},
    {id: 1 , name: "Kasikorn"},
    {id: 2 , name: "Krungthai"},
    {id: 3 , name: "SCB"}
  ]
  return (
    <div className='items-center'>
      <NavBar
        brandName="Petpal"
        navItems = {items}
      />
      <div className='flex m-[50px] flow-root items-center'>
        <div className='max-w-[300px] m-[40px] space-y-[10px] float-left'>
          <ProfilePictureComponent/>
          <h1 className='text-[32px]' >{mockingProvider.Name}</h1>
          <RatingComponent Rating = {mockingProvider.Rating}/>
          <p className='text-[18px]'>{mockingProvider.Description}</p>
          
        </div>
        <div className='max-w-[600px] m-[40px] float-right'>
          <div className = "my-2 close">
            <p>Service Provider Name</p>
            <form className="md:flex pl-9 md:pl-0 ">
              <input
              className="border-2"
              type="text"
              placeholder="Name"
              />
            </form>
          </div>
          <div className = "my-2">
            <p>Description</p>
            <form className="md:flex pl-9 md:pl-0 ">
              <input
              className="border-2"
              type="text"
              placeholder="description"
              />
            </form>
          </div>
          <div className = "my-2">
            <p>Additinal Image</p>
            <form className="md:flex pl-9 md:pl-0 ">
              <button className="border-2" type='button'>upload Image</button>
            </form>
          </div>
          <div className = "my-2">
            <p>Address</p>
            <form className="md:flex pl-9 md:pl-0 ">
              <input
              className="border-2"
              type="text"
              placeholder="address"
              />
            </form>
          </div>
          <div className = "my-2">
            <p>Phone Number</p>
            <form className="md:flex pl-9 md:pl-0 ">
              <input
              className="border-2"
              type="text"
              placeholder="099-xxx-xxxx"
              />
            </form>
          </div>
          <div className = "my-2">
            <p>Bank Account</p>
            <div className={`${isOpen ? 'open' : 'close'}`}>
                <button>bank</button>
                <button className = 'border-2'type='button' onClick={() => {setIsOpenValue(false); alert(isOpen)}}>cancle</button>
            </div>
            <div className={`${!isOpen ? 'open' : 'close'}`}>
              <div className='accountNumber'>
                <p>Account Number</p>
                <form className="md:flex pl-9 md:pl-0 ">
                <input
                className="border-2"
                type="text"
                placeholder="422-xxxxxxxx"
                />
                </form>
              </div>
              <div className='bankName'>
                <p>Bank Name</p>
                <select>
                    {
                      banks.map((bank) => 
                          <option value={bank.id} > 
                              {bank.name}
                          </option>
                      )
                    }
                </select>
              </div>
              <button className = 'border-2'type='button' onClick={() => {setIsOpenValue(true); alert(isOpen)}}>confirm</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
