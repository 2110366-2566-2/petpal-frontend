import React from 'react'

import ButtonPropsInterface from "@app/(routes)/profile/_interface/ButtonPropsInterface"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SmallButtonComponent({ ButtonProps, Working, onClick }: { ButtonProps: ButtonPropsInterface, Working?: boolean, onClick?: any }) {
  const router = useRouter()
  if (onClick === undefined) {
    onClick = () => {
      // console.log(ButtonProps.Link)
      router.push(ButtonProps.Link)
    }
  }
  return (
    <button className={`${ButtonProps.FontColor} ${Working == false ? "bg-[#FFB57E]" : ButtonProps.BgColor} h-[35px] ${ButtonProps.Width} rounded-[10px] text-[18px] text-center p-[5px]`}
      onClick={onClick}
    >
      {/* <a href={`${ButtonProps.Link}`}>{ButtonProps.Name}</a> */}
      {ButtonProps.Name}
    </button>
  )
}
