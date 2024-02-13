import React from "react";
import Image from "next/image";
import defaultImage from './gold.jpg'

export default function AdditionalImageComponent(){
    return(
        <Image className = 'w-[600px] h-[300px] object-crop' src = {defaultImage} alt='default'/>
    )
}