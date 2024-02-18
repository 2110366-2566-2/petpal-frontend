import React from 'react'

import ButtonPropsInterface from '../_interface/ButtonPropsInterface'
import Link from 'next/link'

export default function SmallButtonComponent({ButtonProps,Working}:{ButtonProps:ButtonPropsInterface,Working?:boolean}) {

  return (
    <button className={`${ButtonProps.FontColor} ${ Working == false  ?  "bg-[#FFB57E]" : ButtonProps.BgColor } h-[35px] ${ButtonProps.Width} rounded-[10px] text-[18px] text-center p-[5px]`}>
      <a href={`${ButtonProps.Link}`}>{ButtonProps.Name}</a>
    </button>
  )
}
