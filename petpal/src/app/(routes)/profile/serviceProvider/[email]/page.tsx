'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
// import {getServerSession} from "next-auth";

import ProfilePictureComponent from "@app/(routes)/profile/_components/ProfilePictureComponent"
import RatingComponent from "@app/(routes)/profile/_components/RatingComponent"
import ServiceListComponent from "@app/(routes)/profile/_components/ServiceListComponent"
import AdditionalImageComponent from "@app/(routes)/profile/_components/AdditionalImageComponent"
import createButtonList from "@app/(routes)/profile/_utils/createButtonList"

import ServiceInterface from "@app/(routes)/profile/_interface/ServiceInterface"
import ServiceProviderInterface from "@app/(routes)/profile/_interface/ServiceProviderInterface"
import ButtonPropsInterface from "@app/(routes)/profile/_interface/ButtonPropsInterface"

import { exampleProvider } from "@app/(routes)/profile/_interface/ServiceProviderInterface"
import { editProfileButtonProps, chagnePasswordButtonProps } from "@app/(routes)/profile/_interface/ButtonPropsInterface"

import { getCurrentEntitySvcp } from '@/app/libs/user/getCurrentEntitySvcp';


export default function EmailServiceProviderProfile({ params }: { params: { email: string } }) {
    const [mySvcpId, setMySvcpId] = useState<string>()
    // const targetUserId: string = params.email
    const [targetSvcpId, setTargetSvcpId] = useState<string>(params.email)
    const [targetSvcp, setTargetSvcp] = useState<ServiceProviderInterface>(exampleProvider)
    const [isShownButton, setIsShownButton] = useState<boolean>(false)
    // var [CurrentUser, SetCurrentUser] = useState<number>(0)
    // var [ProfileUserId, SetProfileUserId] = useState<number>(params.id)
    // let serviceProvider: ServiceProviderInterface = exampleProvider
    useEffect(() => {
        getCurrentEntitySvcp().then((Response) => {
            // console.log(Response.id)
            setMySvcpId(Response.SVCPID)
        })
    }, [])

    useEffect(() => {
        setIsShownButton(targetUserId === myUserId)
    }, [targetUserId, myUserId])

    useEffect(() => {

    }, [targetUserId])

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
