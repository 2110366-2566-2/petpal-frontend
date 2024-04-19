'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import UserInterface from '../../_interface/UserInterface'
import PetInterface from '../../_interface/PetInterface'
import ButtonPropsInterface from '../../_interface/ButtonPropsInterface'
import { User } from "@/app/_interface/user/user";
import { EntityType } from '@/app/_enum/currentEntity/EntityType'

import ProfilePictureComponent from '../../_components/ProfilePictureComponent'
import SmalllPetListComponent from '../../_components/SmalllPetListComponent'
import SmallButtonComponent from '../../_components/SmallButtonComponent'

import createButtonList from '../../_utils/createButtonList';
import { checkIfRoomExist } from '@/app/libs/chat/checkIfRoomExist'
import { generateRoomId } from '@/app/_utils/chat/generateRoomId'

import { exampleUser } from '../../_interface/UserInterface'
import { editProfileButtonProps, chagnePasswordButtonProps } from '../../_interface/ButtonPropsInterface'

import { getCurrentEntityUser } from '@/app/libs/currentEntiity/getCurrentEntityUser'

import { getUserById } from '@/app/libs/user/getUserById'
import { adaptorUserToUserInterface } from '../../_interface/UserInterface'
import { craeteNewRoom } from '@/app/libs/chat/createNewRoom'
import { ChatResponse } from '@/app/_interface/chat/ChatResponse'
import { getCurrentEntityType } from '@/app/libs/currentEntiity/getCurrentEntityType'
import { getCurrentEntitySvcp } from '@/app/libs/currentEntiity/getCurrentEntitySvcp'
import { getCurrentEntity } from '@/app/libs/user/userBackend'
import { chatButtonFunction } from '../../_utils/chatButtonFunction'

export default function EmailUserProfile({ params }: { params: { email: string } }) {
    const router = useRouter()
    const [myUserId, setMyUserId] = useState<string>()
    const [myType, setMyType] = useState<EntityType>()
    // const targetUserId: string = params.email
    const [targetUserId, setTargetUserId] = useState<string>(params.email)
    const [targetUser, setTargetUser] = useState<UserInterface>(exampleUser)
    const [isShownButton, setIsShownButton] = useState<boolean>(false)
    const [targetUserPetList, setTargetUserPetList] = useState<PetInterface[]>([])
    const [chatOnClick, setChatOnClick] = useState<() => void>()
    useEffect(() => {
        getCurrentEntity().then((response) => {
            switch (getCurrentEntityType(response)) {
                case EntityType.USER: {
                    setMyUserId(response.id)
                    setMyType(EntityType.USER)
                    break
                } case EntityType.SERVICE_PROVIDER: {
                    setMyUserId(response.SVCPID)
                    setMyType(EntityType.SERVICE_PROVIDER)
                    break
                } default: {
                    console.log("error")
                    break
                }
            }
        })
    }, [])

    useEffect(() => {
        setIsShownButton(targetUserId === myUserId)
        if (myUserId !== undefined) {
            let thisUserId: string = myUserId
            const newChatOnClick = () => {
                let thisUserId: string = myUserId
                chatButtonFunction(
                    thisUserId,
                    targetUserId,
                    myType,
                    EntityType.USER
                )
            }
            setChatOnClick(newChatOnClick)
        }
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
                    <ProfilePictureComponent src={targetUser.profilePictureSrc} />
                    <h1 className='text-[32px]' ><b>{targetUser.Name}</b></h1>
                    <div className='hidden md:block'>
                        {createButtonList(isShownButton, buttonPropsList, chatOnClick)}
                    </div>
                </div>
                <div className='max-w-[300px] md:max-w-[600px] mx-[auto] md:mt-[0px] pt-[20px] md:float-right space-y-[30px] md:ml-[10px]'>
                    <h1 className='font-bold text-[32px]'>Pets</h1>
                    <div>
                        {targetUserPetList.map((pet: PetInterface) => <SmalllPetListComponent pet={pet} key={pet.name}></SmalllPetListComponent>)}
                    </div>
                    <div className='md:hidden block'>
                        {createButtonList(isShownButton, buttonPropsList, chatOnClick)}
                    </div>
                </div>
            </div>
        </div>
    )
}
