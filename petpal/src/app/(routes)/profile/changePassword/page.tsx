'use client'
import React from 'react'
import ProfilePictureComponent from "@app/(routes)/profile/_components/ProfilePictureComponent"
import SmallButtonComponent from "@app/(routes)/profile/_components/SmallButtonComponent"
import ButtonPropsInterface, { editProfileButtonProps,saveEditButtonProps } from "@app/(routes)/profile/_interface/ButtonPropsInterface"
import { useState,useEffect,useContext } from 'react'
import { getCurrentEntity } from '@/app/libs/user/userBackend'
import { changePasswordApi } from '@/app/libs/auth/changePassword'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/app/_contexts/AuthContext'

export default function changePassword() {
  
  const [password,setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  const [usertype , setUsertype] = useState('')
  const [email , setEmail] = useState('')
  const [profileImg , setProfileImg] = useState('')
  const {currentEntity , setCurrentEntity , isLogin , setIsLogin} = useContext(AuthContext)


  useEffect(()=>{
    const fetchData= async()=>{
      const entity = await getCurrentEntity()
      setUsertype(()=>{
        if(!entity.SVCPID) return 'user'
        else return 'serviceProvider'
      })
      setProfileImg(()=>{
        if(!entity.SVCPID) return entity.SVCPImg
        else return entity.profilePicture
      })

      setEmail(()=>{
        if(entity.SVCPEmail) return entity.SVCPEmail
        else return entity.email
      })
    }
    fetchData()
  },[])

  const handleSubmit = async()=>{
    if(password === confirmPassword){
      // console.log(password,confirmPassword)
      return await changePasswordApi(password,email,usertype)
    }
  }
  const route = useRouter()
  let thissaveEditButtonProps:ButtonPropsInterface = saveEditButtonProps
  thissaveEditButtonProps.Link = './'
  return (
    <div className='items-center'>
      <div className='md:flex m-[50px] items-center'>
        <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top'>
          <ProfilePictureComponent src = {`data:image/jpg;base64, ${profileImg}`}/>
          <div className='hidden md:grid grid-cols-1 gap-[16px]'>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps} onClick={()=>{handleSubmit();route.push(thissaveEditButtonProps.Link)}}></SmallButtonComponent>
          </div>
        </div>
        <div className='w-[100%] md:max-w-[600px]   md:float-right m-auto space-y-[30px] mt-[0px] mb-[20px]'>
          <div className = "my-2">
          <span className='text-black font-bold text-[32px]'>Change Password</span>
            <input type='password' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
             />
          </div>
          <div className = "my-2">
          <span className='text-black font-bold text-[32px]'>Comfirm Password</span>
            <input type='password' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
            border-[#D9D9D9] border-[3px]'
            value = {confirmPassword}
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
             />
          </div>
        </div>
        <div className='w-[100%] grid grid-cols-1 gap-[16px] md:hidden '>
            <SmallButtonComponent ButtonProps={editProfileButtonProps} Working = {false}></SmallButtonComponent>
            <SmallButtonComponent ButtonProps={saveEditButtonProps} onClick={()=>{handleSubmit();route.push(thissaveEditButtonProps.Link)}}></SmallButtonComponent>
        </div>
      </div>

    </div>
  )
}
