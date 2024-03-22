'use client'
import React, { useEffect, useState } from 'react'

import UserInterface from '../../_interface/UserInterface'
import PetInterface from '../../_interface/PetInterface'
import ButtonPropsInterface from '../../_interface/ButtonPropsInterface'

import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import SmalllPetListComponent from '../../_components/SmalllPetListComponent'
import SmallButtonComponent from '../../_components/SmallButtonComponent'

import createButtonList from '../../_utils/createButtonList';

import { exampleUser } from '../../_interface/UserInterface'
import { editProfileButtonProps, chagnePasswordButtonProps } from '../../_interface/ButtonPropsInterface'

import { getCurrentEntityUser } from '@/app/libs/user/getCurrentEntityUser'

export default function EmailUserProfile({ params }: { params: { email: string } }) {
    const [myUserId, setMyUserId] = useState<string>()
    // const targetUserId: string = params.email
    const [targetUserId, setTargetUserId] = useState<string>(params.email)
    const [targetUser, setTargetUser] = useState<UserInterface>(exampleUser)
    const [isShownButton, setIsShownButton] = useState<boolean>(false)
    useEffect(() => {
        getCurrentEntityUser().then((Response) => {
            // console.log(Response.id)
            setMyUserId(Response.id)
        })
    }, [])

    useEffect(() => {
        setIsShownButton(targetUserId === myUserId)
    }, [targetUserId, myUserId])

    useEffect(() => {

    }, [targetUserId])
    // var targetUser: UserInterface = exampleUser

    const buttonPropsList: ButtonPropsInterface[] = [editProfileButtonProps, chagnePasswordButtonProps]

    const MY_EMAIL: string = "me"
    // var showButton: boolean = email === MY_EMAIL

    return (
        <div className='items-center'>
            <div className='md:flex items-top p-[20px] m-auto md:max-w-[1100px]'>
                <div className='max-w-[300px] m-auto space-y-[10px] md:float-left mt-[0px] md:mr-[10px]'>
                    <ProfilePictureComponent />
                    <div className='hidden md:block'>
                        {createButtonList(isShownButton, buttonPropsList)}
                    </div>
                </div>
                <div className='max-w-[300px] md:max-w-[600px] mx-[auto] md:mt-[0px] pt-[20px] md:float-right space-y-[30px] md:ml-[10px]'>
                    <h1 className='font-bold text-[32px]'>Pets</h1>
                    <div>
                        {targetUser.PetList.map((Pet: PetInterface) => <SmalllPetListComponent Pet={Pet} key={Pet.Name}></SmalllPetListComponent>)}
                    </div>
                    <div className='md:hidden block'>
                        {createButtonList(isShownButton, buttonPropsList)}
                    </div>
                </div>
            </div>
        </div>
    )
}
