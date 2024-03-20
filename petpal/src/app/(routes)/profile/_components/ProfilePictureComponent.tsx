import React from 'react'
import defaultImage from "@app/(routes)/profile/_components/gold.jpg"
import Image from 'next/image'

export default function ProfilePictureComponent(){
    return (
        <Image className = 'w-[250px] h-[250px] mx-auto md:mx-0 object-crop rounded-[20px] justify-center' src = {defaultImage} alt='default'/>
    )
}