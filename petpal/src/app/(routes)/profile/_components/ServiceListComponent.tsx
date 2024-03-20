import React from "react";
import ServiceInterface from "@app/(routes)/profile/_interface/ServiceInterface";



export default function ServiceListComponent({Service}:{Service:ServiceInterface}){
    var monthName:string[] = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"] 
    return(
        <li className="w-[250px] h-[250px] m-[10px] shadow-lg bg-[#F9F9F9] shadow-[#00000040] rounded-[20px]">
            <div className="p-[20px] space-y-[20px] m-[10px]">
                <div className="">
                    <h2 className="text-[18px] font-bold">{Service.Name}</h2>
                    <p className = 'text-[#858585] text-[14px]'>{Service.Type}</p> 
                </div>
                <div className="">
                    <h2 className="text-[18px] font-bold">{monthName[Service.StartDate.getMonth()-1]} {Service.StartDate.getDate()}</h2>
                    <h2 className="text-[18px] fond-bold">{Service.StartDate.getHours()}.{Service.StartDate.getMinutes()}-{Service.EndDate.getHours()}.{Service.EndDate.getMinutes()}</h2>
                </div>
                <div>
                    <h2 className="text-[32px] fond-bold">{Service.Price}฿</h2>
                </div>
            </div>
        </li>
    )
}