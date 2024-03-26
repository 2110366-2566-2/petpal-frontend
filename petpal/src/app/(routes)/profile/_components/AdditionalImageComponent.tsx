import React from "react";
import Image from "next/image";
import defaultImage from "@app/(routes)/profile/_components/gold.jpg"
import { StaticImageData } from "next/image";

export default function AdditionalImageComponent({ src }: { src: string }) {
    const mockSrc: StaticImageData =
    {
        src: `data:image/png;base64, ${src}`,
        height: 600,
        width: 300,
    }
    return (
        <div className="md:w-[600px]">
            <Image className='md:max-w-[600px] max-w-[300px] max-h-[300px] object-crop m-auto' src={mockSrc} alt='default' />
        </div>
    )
}