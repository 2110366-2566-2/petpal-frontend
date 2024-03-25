'use client'
import React from 'react'
import { useState, useEffect } from 'react';
// import {getServerSession} from "next-auth";

import ProfilePictureComponent from "@app/(routes)/profile/_components/ProfilePictureComponent"
import RatingComponent from "@app/(routes)/profile/_components/RatingComponent"
import ServiceListComponent from "@app/(routes)/profile/_components/ServiceListComponent"
import AdditionalImageComponent from "@app/(routes)/profile/_components/AdditionalImageComponent"
import createButtonList from "@app/(routes)/profile/_utils/createButtonList"

import ServiceInterface from "@app/(routes)/profile/_interface/ServiceInterface"
import ServiceProviderInterface, { adaptorSvcpToServiceProviderInterface } from "@app/(routes)/profile/_interface/ServiceProviderInterface"
import ButtonPropsInterface from "@app/(routes)/profile/_interface/ButtonPropsInterface"

import { exampleProvider } from "@app/(routes)/profile/_interface/ServiceProviderInterface"
import { editProfileButtonProps, chagnePasswordButtonProps, createServiceButton } from "@app/(routes)/profile/_interface/ButtonPropsInterface"

import { getCurrentEntitySvcp } from '@/app/libs/currentEntiity/getCurrentEntitySvcp';
import getSVCP from '@/app/libs/serviceProvider/getSVCP';
import { Svcp } from '@/app/_interface/svcp/svcp';


export default function EmailServiceProviderProfile({ params }: { params: { email: string } }) {
    const [mySvcpId, setMySvcpId] = useState<string>()
    // const targetUserId: string = params.email
    const [targetSvcpId, setTargetSvcpId] = useState<string>(params.email)
    const [targetSvcp, setTargetSvcp] = useState<ServiceProviderInterface>(exampleProvider)
    const [isShownButton, setIsShownButton] = useState<boolean>(false)
    const [targetSvcpServiceList, setTargetSvcpServiceList] = useState<ServiceInterface[]>([])
    // var [CurrentUser, SetCurrentUser] = useState<number>(0)
    // var [ProfileUserId, SetProfileUserId] = useState<number>(params.id)
    // let serviceProvider: ServiceProviderInterface = exampleProvider
    useEffect(() => {
        getCurrentEntitySvcp().then((Response) => {
            setMySvcpId(Response.SVCPID)
        })
    }, [])

    useEffect(() => {
        setIsShownButton(targetSvcpId === mySvcpId)
    }, [targetSvcpId, mySvcpId])

    useEffect(() => {
        if (targetSvcpId !== undefined) {
            getSVCP(targetSvcpId).then((response) => {
                const responeSvcp: Svcp = response as Svcp
                const newSvcp: ServiceProviderInterface = adaptorSvcpToServiceProviderInterface(responeSvcp)
                setTargetSvcp(newSvcp)
            })
        }
    }, [targetSvcpId])

    useEffect(() => {
        setTargetSvcpServiceList(targetSvcp.ServiceList)
    }, [targetSvcp])

    let thisEditProfileButton: ButtonPropsInterface = editProfileButtonProps
    thisEditProfileButton.Link = "/profile/serviceProvider/edit"
    let thisChagnePasswordButtonProps: ButtonPropsInterface = chagnePasswordButtonProps
    thisChagnePasswordButtonProps.Link = "/profile/serviceProvider/changePassword"
    let thisCreateServiceButtonProps: ButtonPropsInterface = {
        Name: "Create Service",
        Width: "w-[180px]",
        BgColor: "bg-[#FF0000]",
        FontColor: "text-[#FFF]",
        Link: `${targetSvcpId}/createService`,
    }
    let buttonPropsList: ButtonPropsInterface[] = [thisEditProfileButton, thisChagnePasswordButtonProps, thisCreateServiceButtonProps]

    return (
        <div className='items-center'>
            <div className='md:flex items-top p-[20px] m-auto md:max-w-[1100px] md:mt-[30px]'>
                <div className='max-w-[300px] m-auto space-y-[20px] md:ml-[80px] md:float-left mt-[0px] md:mr-[50px]'>
                    <ProfilePictureComponent src={targetSvcp.profileImage} />
                    <h1 className='text-[32px]' ><b>{targetSvcp.Name}</b></h1>
                    <RatingComponent Rating={targetSvcp.Rating} />
                    <p className='text-[18px]'>{targetSvcp.Description}</p>
                    <div className='hidden md:block'>
                        {createButtonList(isShownButton, buttonPropsList = buttonPropsList)}
                    </div>
                </div>
                <div className='max-w-[300px] md:max-w-[600px] m-[auto] md:mt-[0px] pt-[20px] md:pt-[0px] md:float-right space-y-[30px] md:ml-[10px]'>
                    <AdditionalImageComponent src={targetSvcp.additionalImage}></AdditionalImageComponent>
                    <div className="space-y-[10px] m-auto">
                        <p><b>Address:</b> {targetSvcp.Address}</p>
                        <p><b>Phone:</b> {targetSvcp.PhoneNumber}</p>
                    </div>
                    <div className='space-y-[15px]'>
                        <h1 className='text-[32px] '><b>Service Listing</b></h1>
                        <ul className='md:flex overflow-auto md:flex-auto'>
                            {targetSvcpServiceList.map((Service: ServiceInterface) => <ServiceListComponent Service={Service} key={Service.Name + Service.Type}></ServiceListComponent>)}
                        </ul>
                    </div>
                    <div className='md:hidden block'>
                        {createButtonList(isShownButton, buttonPropsList = buttonPropsList)}
                    </div>
                </div>
            </div>
        </div>
    )
}
