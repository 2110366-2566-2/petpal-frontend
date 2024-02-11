import React from "react";
import ServiceInterface from "../_interface/ServiceInterface";


export default function ServiceListComponent({Service}:{Service:ServiceInterface}){
    return(
        <div className="w-[250px] h-[250px] bg-[#00000040] rounded-[20px]">
            <div className="p-[20px]">
                <div className="">
                    <h2>{Service.Name}</h2>
                    <p>{Service.Type}</p> 
                </div>
                <div>
                    <h2>{Service.StartDate.getMonth()} {Service.StartDate.getDate()}</h2>
                    <h2>{Service.StartDate.getHours()} {Service.EndDate.getHours()}</h2>
                </div>
                <div>
                    <h2>{Service.Price}</h2>
                </div>
            </div>
        </div>
    )
}