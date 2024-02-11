import React from 'react'
import defaultImage from './gold.jpg'
import Image from 'next/image'

export default function ProfilePictureComponent(){
    return (
        <Image className = 'w-[250px] h-[250px] object-crop rounded-[20px]' src = {defaultImage} width={250} height={250} aspect-ratio='unset' alt='default'/>
    )
}