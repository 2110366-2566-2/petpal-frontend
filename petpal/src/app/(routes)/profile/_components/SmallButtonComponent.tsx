import React from 'react'

import ButtonPropsInterface from '../_interface/ButtonPropsInterface'

export default function SmallButton({ButtonProps}:{ButtonProps:ButtonPropsInterface}) {
  return (
    <button className="bg-[${ButtonProps.BgColor}] h-[35px] w-[150px] rounded-[10px]">
      {ButtonProps.Name}
    </button>
  )
}
