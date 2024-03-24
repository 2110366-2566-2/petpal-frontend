'use client'
import React, { useEffect, useState } from 'react'

import UserInterface from '../../_interface/UserInterface'
import PetInterface from '../../_interface/PetInterface'
import ButtonPropsInterface from '../../_interface/ButtonPropsInterface'
import { User } from "@/app/_interface/user/user";

import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import SmalllPetListComponent from '../../_components/SmalllPetListComponent'
import SmallButtonComponent from '../../_components/SmallButtonComponent'

import createButtonList from '../../_utils/createButtonList';

import { exampleUser } from '../../_interface/UserInterface'
import { editProfileButtonProps, chagnePasswordButtonProps } from '../../_interface/ButtonPropsInterface'

import { getCurrentEntityUser } from '@/app/libs/currentEntiity/getCurrentEntityUser'

import { getUserById } from '@/app/libs/user/getUserById'
import { adaptorUserToUserInterface } from '../../_interface/UserInterface'

export default function EmailUserProfile({ params }: { params: { email: string } }) {
    const [myUserId, setMyUserId] = useState<string>()
    // const targetUserId: string = params.email
    const [targetUserId, setTargetUserId] = useState<string>(params.email)
    const [targetUser, setTargetUser] = useState<UserInterface>(exampleUser)
    const [isShownButton, setIsShownButton] = useState<boolean>(false)
    const [targetUserPetList, setTargetUserPetList] = useState<PetInterface[]>([])
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
        if (targetUserId !== undefined) {
            getUserById(targetUserId).then((response) => {
                const responeUser: User = response as User
                const newSvcp: UserInterface = adaptorUserToUserInterface(responeUser)
                setTargetUser(newSvcp)
            })
        }
    }, [targetUserId])
    // var targetUser: UserInterface = exampleUser
    useEffect(() => {
        setTargetUserPetList(targetUser.PetList)
    }, [targetUser])

    let thisEditProfileButton: ButtonPropsInterface = editProfileButtonProps
    thisEditProfileButton.Link = "/profile/user/edit"
    let thisChagnePasswordButtonProps: ButtonPropsInterface = chagnePasswordButtonProps
    thisChagnePasswordButtonProps.Link = "/profile/changePassword"

    const buttonPropsList: ButtonPropsInterface[] = [thisEditProfileButton, thisChagnePasswordButtonProps]

    return (
        <div className='items-center'>
            <div className='md:flex items-top p-[20px] m-auto md:max-w-[1100px] md:mt-[30px]'>
                <div className='max-w-[300px] m-auto space-y-[20px] md:ml-[80px] md:float-left mt-[0px] md:mr-[50px]'>
                    <ProfilePictureComponent />
                    <h1 className='text-[32px]' ><b>{targetUser.Name}</b></h1>
                    <div className='hidden md:block'>
                        {createButtonList(isShownButton, buttonPropsList)}
                    </div>
                </div>
                <div className='max-w-[300px] md:max-w-[600px] mx-[auto] md:mt-[0px] pt-[20px] md:float-right space-y-[30px] md:ml-[10px]'>
                    <h1 className='font-bold text-[32px]'>Pets</h1>
                    <div>
                        {targetUserPetList.map((pet: PetInterface) => <SmalllPetListComponent pet={pet} key={pet.name}></SmalllPetListComponent>)}
                    </div>
                    <div className='md:hidden block'>
                        {createButtonList(isShownButton, buttonPropsList)}
                    </div>
                </div>
            </div>
        </div>
    )
}
