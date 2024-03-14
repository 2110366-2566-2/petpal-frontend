'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
// import {getServerSession} from "next-auth";

import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import RatingComponent from '../../_components/RatingComponent'
import ServiceListComponent from '../../_components/ServiceListComponent'
import AdditionalImageComponent from '../../_components/AdditionalImageComponent'
import createButtonList from '../../_utils/createButtonList';

import ServiceInterface from '../../_interface/ServiceInterface'
import ServiceProviderInterface from '../../_interface/ServiceProviderInterface'
import ButtonPropsInterface from '../../_interface/ButtonPropsInterface'

import { exampleProvider } from '../../_interface/ServiceProviderInterface'
import { editProfileButtonProps, chagnePasswordButtonProps } from '../../_interface/ButtonPropsInterface'


export default function EmailServiceProviderProfile({ params }: { params: { id: number } }) {
    var [CurrentUser, SetCurrentUser] = useState<number>(0)
    var [ProfileUserId, SetProfileUserId] = useState<number>(params.id)
    let serviceProvider: ServiceProviderInterface = exampleProvider

    var thisEditProfileButton = editProfileButtonProps
    thisEditProfileButton.Link = usePathname() + "edit"
    var buttonPropsList: ButtonPropsInterface[] = [editProfileButtonProps, chagnePasswordButtonProps]
    var showButton: boolean = CurrentUser == ProfileUserId

    return (
        <div className='items-center'>
            <div className='md:flex items-top p-[20px] m-auto md:max-w-[1100px]'>
                <div className='max-w-[300px] m-auto space-y-[10px] md:float-left mt-[0px] md:mr-[10px]'>
                    <ProfilePictureComponent />
                    <h1 className='text-[32px]' ><b>{serviceProvider.Name}</b></h1>
                    <RatingComponent Rating={serviceProvider.Rating} />
                    <p className='text-[18px]'>{serviceProvider.Description}</p>
                    <div className='hidden md:block'>
                        {createButtonList(showButton, buttonPropsList = buttonPropsList)}
                    </div>
                </div>
                <div className='max-w-[300px] md:max-w-[600px] m-[auto] md:mt-[0px] pt-[20px] md:float-right space-y-[30px] md:ml-[10px]'>
                    <AdditionalImageComponent></AdditionalImageComponent>
                    <div className="space-y-[10px] m-auto">
                        <p><b>Address:</b> {serviceProvider.Address}</p>
                        <p><b>Phone:</b> {serviceProvider.PhoneNumber}</p>
                    </div>
                    <div className='space-y-[15px]'>
                        <h1 className='text-[32px] '><b>Service Listing</b></h1>
                        <ul className='md:flex overflow-auto md:flex-auto'>
                            {serviceProvider.ServiceList.map((Service: ServiceInterface) => <ServiceListComponent Service={Service} key={Service.Name}></ServiceListComponent>)}
                        </ul>
                    </div>
                    <div className='md:hidden block'>
                        {createButtonList(showButton, buttonPropsList = buttonPropsList)}
                    </div>
                </div>
            </div>
        </div>
    )
}
