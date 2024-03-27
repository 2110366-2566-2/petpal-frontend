'use client'

import React, { useState,useEffect } from 'react'
import ProfilePictureComponent from '@app/(routes)/profile/_components/ProfilePictureComponent'
import RatingComponent from '@app/(routes)/profile/_components/RatingComponent'
import ServiceListComponent from '@app/(routes)/profile/_components/ServiceListComponent'
import ServiceProviderInterface from '@app/(routes)/profile/_interface/ServiceProviderInterface'
import ServiceInterface from '@app/(routes)/profile/_interface/ServiceInterface'
import { saveEditButtonProps, editProfileButtonProps } from '@app/(routes)/profile/_interface/ButtonPropsInterface'
import SmallButtonComponent from '@app/(routes)/profile/_components/SmallButtonComponent'
import FetchBankInformation from '@app/(routes)/profile/_components/FetchedBankInformation'
import { getCurrentEntity } from '@/app/libs/user/userBackend'
import { editSvcpProfile } from '@/app/libs/serviceProvider/editSvcpProfile'
import ButtonPropsInterface from '@app/(routes)/profile/_interface/ButtonPropsInterface'
import { useRouter } from 'next/navigation'
import uploadImgApi from '@/app/libs/user/uploadImgApi'

export default function EditProfile() {

  const [username , setUsername] = useState<string>('')
  const [description , setDescription] = useState<string>('')
  const [address , setAddress] = useState<string>('')
  const [phoneNumber , setPhoneNumber] = useState<string>('')
  const [profileImg , setProfileImg] = useState<string>('')
  const [addiImg , setAddiImg] = useState<string>('')

  const [fileProImg , setFileProImg] = useState<File>()
  const [fileAddiImg , setFilAddiImg] = useState<File>()

  let thisSaveProfileButton: ButtonPropsInterface = saveEditButtonProps
  thisSaveProfileButton.Link = "/profile/serviceProvider"

  useEffect(()=>{
    const fetchData = async() =>{
      const entity = await getCurrentEntity()
      // console.log(entity)
      setUsername(entity.SVCPUsername || "")
      setDescription(entity.description || "")
      setAddress(entity.address || "")
      setPhoneNumber(entity.phoneNumber || "")

      setProfileImg(entity.SVCPImg)
      setAddiImg(entity.SVCPAdditionalImg)

    }
    fetchData()
  },[])


  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      if(file){
        fileReader.readAsDataURL(file);
      }
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async() => {
    // console.log(username,description,address,phoneNumber)
    if(fileProImg) await uploadImgApi(fileProImg)
    await editSvcpProfile(
      username,
      description,
      address,
      phoneNumber,
    )
  }

  const handleAddImg = async (e:React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.files){
      console.log("Recieve")
      let imgfile = e.target.files?.[0]
      setFileProImg(imgfile)
      // setProfileImg(await toBase64(imgfile) as string)
    }
  }
  const router = useRouter()
  return (
    <div className='items-center'>
      <div className=' md:flex m-[50px] items-center '>
        <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top md:mr-[10px]'>
          <div>
            <ProfilePictureComponent src={profileImg} />
            <p >upload profile</p>
            <input type='file' className="mt-2 bg-[#D9D9D9] w-[200px] h-[35px] rounded-[10px] text-[14px] text-center p-[5px]"
            
            onChange={(e)=>{handleAddImg(e)}}
            />
          </div>
          <div className='hidden md:grid grid-cols-1 gap-[16px]'>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working={false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={thisSaveProfileButton} onClick={async() =>{handleSubmit();router.push(thisSaveProfileButton.Link)}}></SmallButtonComponent>
            {/* <button className='bg-gray' onClick={async()=>{handleSubmit()}}>save</button> */}
          </div>
        </div>
        <div className='w-[100%] md:max-w-[600px]   float-right m-auto space-y-[30px] mt-[0px] mb-[20px] md:ml-[10px]'>
          <div className="my-2 ">
            <span className='text-black font-bold text-[32px]'>Username</span>
            <input type='username' className='p-1 mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            placeholder='username' />
          </div>
          <div className="my-2 ">
            <span className='text-black font-bold text-[32px]'>Description</span>
            <textarea className='mt-1 block w-full rounded-md border-gray-300 shadow-sm border-[#D9D9D9] border-[3px]
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-[200px] p-2'
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            />
          </div>
          <div className="my-2">
            <span className='text-black font-bold text-[32px]'>Additional Image</span>
            <form className="md:flex md:pl-0 ">
            <input type='file' className="mt-2 bg-[#D9D9D9] w-[200px] h-[35px] rounded-[10px] text-[14px] text-center p-[5px]"
            onChange={(e)=>{handleAddImg(e)}}
            />
            </form>
          </div>
          <div className="my-2 ">
            <span className='text-black font-bold text-[32px]'>Address</span>
            <input type='address' className='p-1 mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            value={address}
            onChange={(e) => {setAddress(e.target.value)}}
            placeholder='123 Wangmai Pathumwan Bangkok' />
          </div>
          <div className="my-2 ">
            <span className='text-black font-bold text-[32px]'>Phone Number</span>
            <input type='phoneNumber' className='p-1 mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
            placeholder='099-xxx-xxxx' />
          </div>
          <div><FetchBankInformation/></div>
        </div>
        <div className='w-[100%] grid grid-cols-1 gap-[16px] md:hidden '>
          <SmallButtonComponent ButtonProps={editProfileButtonProps} Working={false}></SmallButtonComponent>
          <SmallButtonComponent ButtonProps={thisSaveProfileButton} onClick={async() =>{handleSubmit();router.push(thisSaveProfileButton.Link)}}></SmallButtonComponent>
        </div>
      </div>

    </div>
  )
}
