import React from 'react'
import defaultPic from './gold.jpg'
import Image from 'next/image'

export default function PictureComponent(){
    return (
        <Image src = {defaultPic} alt='default' className='Profile-Image'/>
    )
}