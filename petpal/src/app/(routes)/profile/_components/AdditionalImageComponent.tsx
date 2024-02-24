import React from "react";
import Image from "next/image";
import defaultImage from './gold.jpg'

export default function AdditionalImageComponent(){
    return(
        <Image className = 'md:max-w-[600px] max-w-[300px] max-h-[300px] object-crop m-auto' src = {defaultImage} alt='default'/>
    )
}