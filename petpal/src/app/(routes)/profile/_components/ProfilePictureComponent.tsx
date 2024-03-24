import React from 'react'
import defaultImage from "@app/(routes)/profile/_components/gold.jpg"
import Image from 'next/image'
import { StaticImageData } from 'next/image'

export default function ProfilePictureComponent({ src }: { src: string }) {
    const mockSrc: StaticImageData =
    {
        src: `data:image/png;base64, ${src}`,
        height: 250,
        width: 250,
    }
    return (
        <Image className='w-[250px] h-[250px] mx-auto md:mx-0 object-crop rounded-[20px] justify-center' src={mockSrc} alt='default' />

    )
}