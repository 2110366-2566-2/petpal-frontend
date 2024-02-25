import React from "react";
import Maginifying from "../_src/Magnifying.png"
export default function ChatSearchBar() {
    return (
        <div className="p-[10px] md:px-[0px] md:pt-[0px]">
            <div className="flex flex-row space-x-[10px] m-auto bg-[#D9D9D9] py-[2px] px-[20px] rounded-[5px]">
                <img src={Maginifying.src} alt="Maginifying" className="w-[12px] h-[12px] my-auto" />
                <input className="bg-[#D9D9D9] outline-none" type="text" placeholder="Search" />
            </div>
        </div>
    )
}