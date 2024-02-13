import React from 'react'

import ButtonPropsInterface from '../_interface/ButtonPropsInterface'

export default function SmallButtonComponent({ButtonProps}:{ButtonProps:ButtonPropsInterface}) {
  // ${ButtonProps.BgColor}
  return (
    <button className={`text-[${ButtonProps.FontColor}] bg-[${ButtonProps.BgColor}] h-[35px] w-[${ButtonProps.Width.toString()}px] rounded-[10px] text-[18px] text-left px-[5px]`}>
      {ButtonProps.Name}
    </button>
  )
}
