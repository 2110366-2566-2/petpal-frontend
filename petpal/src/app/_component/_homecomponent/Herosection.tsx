import Image from 'next/image'
import React from 'react'
import BasicButton from '../BasicButton'

export default function Herosection() {

    const imageStyle = {
        borderRadius: '10%',
        border: '1px solid #fff',
      }

  return (
    <div className='flex flex-col min-[900px]:flex-row justify-center items-center p-10 gap-20 bg-[#FAF8ED]'>
        <div className='flex flex-col gap-y-10'>
            <div className='text-orange text-7xl font-bold'>
                PETPAL
            </div>
            <div className='text-[#4f4f4f] text-2xl font-semibold'>
                Find pet care services for your little pals.
            </div>
            <div className='w-[40%]'>
                <BasicButton name={'Start now'}/>
            </div>
      
        </div>
        <Image 
            alt='catndog' 
            src='/catndog.jpg'  
            width={500}
            height={500}
            style={imageStyle}
        />
        
    </div>
  )
}
