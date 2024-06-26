'use client'

import React from 'react'
import ProfilePictureComponent from "@app/(routes)/profile/_components/ProfilePictureComponent"
import RatingComponent from "@app/(routes)/profile/_components/RatingComponent"
import ServiceListComponent from "@app/(routes)/profile/_components/ServiceListComponent"
import ServiceProviderInterface from "@app/(routes)/profile/_interface/ServiceProviderInterface"
import ServiceInterface from "@app/(routes)/profile/_interface/ServiceInterface"
import PetInformation from "@app/(routes)/profile/_components/PetInformation"
import FetchBankInformation from "@app/(routes)/profile/_components/FetchedBankInformation"
import SmallButtonComponent from "@app/(routes)/profile/_components/SmallButtonComponent"
import { editProfileButtonProps, saveEditButtonProps } from "@app/(routes)/profile/_interface/ButtonPropsInterface"
import { useState, useEffect } from 'react'
import { getCurrentEntity } from '@/app/libs/user/userBackend'
import { editUserProfile } from '@/app/libs/user/editUserProfile'
import { useRouter } from 'next/navigation'
import uploadImgApi from '@/app/libs/user/uploadImgApi'

import ButtonPropsInterface from "@app/(routes)/profile/_interface/ButtonPropsInterface"


export default function EditProfile() {

  const [username , setUsername] = useState('')
  const [profileImg , setProfileImg] = useState('')
  const [fileProImg ,setFileProImg] = useState<File>()
  const [errorMessage , setErrorMessage] = useState('')
  const [errorMessageName , setErrorMessageName] = useState('')

  useEffect(()=>{
    const fetchData = async()=>{
      const entity = await getCurrentEntity()
      setUsername(entity.username)
      setProfileImg(entity.profilePicture)
    }
    fetchData()
  },[])

  const handleSubmit = async()=>{
    if(fileProImg) await uploadImgApi(fileProImg)
    
    if(username == ''){
      setErrorMessageName('Please set your username')
    }else{
      setErrorMessageName('')
      await editUserProfile(username)
      router.push(thissaveEditButtonProps.Link)
    }
  }

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const router = useRouter()
  let thissaveEditButtonProps:ButtonPropsInterface = saveEditButtonProps
  thissaveEditButtonProps.Link = '../'

  return (
    <div className='items-center'>
      <div className='md:flex m-[50px] items-center'>
        <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] md:mr-3 items-top'>
          <div>
            <ProfilePictureComponent src={profileImg} />
            <p >upload profile</p>
            <input type='file' className="mt-2 bg-[#D9D9D9] w-[200px] h-[35px] rounded-[10px] text-[14px] text-center p-[5px]"
            onChange={(e)=>{setFileProImg(e.target.files?.[0])}}
            />
          </div>
          <div className='hidden md:grid grid-cols-1 gap-[16px]'>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working={false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps} onClick={() => {handleSubmit()}}></SmallButtonComponent>
          </div>
        </div>
        <div className='w-[100%] md:max-w-[600px]  md:float-right m-auto space-y-[30px] mt-[0px] mb-[20px]'>
          <div className="my-2 ">
            <span className='text-black font-bold text-[20px]'>Username</span>
            <input type='username' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-gray border-[3px]'
              value = {username}
              onChange={(e)=>{setUsername(e.target.value)}}
              placeholder='username' />
              {
                (errorMessageName != "") &&
                <div className='ml-1'>
                <span className='text-[#FF0000]'>{errorMessageName}</span>
                </div>
            }
          </div>
          <div className="my-2 ">
            <PetInformation />
          </div>
          <FetchBankInformation />
        </div>
        <div className='w-[100%] grid grid-cols-1 gap-[16px] md:hidden '>
          <SmallButtonComponent ButtonProps={editProfileButtonProps} Working={false}></SmallButtonComponent>
          <SmallButtonComponent ButtonProps={saveEditButtonProps}  onClick={() => {
            handleSubmit(); 
            }}></SmallButtonComponent>
            {
                (errorMessage != "") &&
                <div className='ml-1'>
                <span className='text-[#FF0000]'>{errorMessage}</span>
                </div>
            }
        </div>
      </div>

    </div>
  )
}

