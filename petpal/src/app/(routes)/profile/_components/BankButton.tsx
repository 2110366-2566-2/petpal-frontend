'use client'
import React from 'react'


interface BButtonProps{
    Reqmethod:(params:any) => any,
    Log:any
    // Name:String
}

export default function BankButton({Req}:{Req:BButtonProps}) {

  return (
    <button className='bg-[#D9D9D9] w-[102px] rounded-[10px] text-[18px] text-center p-[5px] mt-4' onClick={async () => {await Req.Reqmethod(Req.Log); }}>
      {/* {ButtonProps.Name} */}hello
    </button>
  )
}
