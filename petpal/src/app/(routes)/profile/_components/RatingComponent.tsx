import React from "react";

export default function RatingComponent({Rating}:{Rating:number}){
    return(
        <p className="text-[#FF872F] text-[32px] font-bold">{Rating} ★ </p>
    )
}