import { API_URL } from "@/app/_constants/env";

export default async function createServiceApi(
    price:number,
    serviceDescription:string,
    serviceName:string,
    serviceType:string,
    timeslot:Array<Object>
){
    console.log("In api", timeslot)
    const response = await fetch(API_URL + '/service/create' , {
        method:'POST',
        credentials:'include',
        body: JSON.stringify({
            price:price,
            serviceDescription:serviceDescription,
            serviceName:serviceName,
            serviceType:serviceType,
            timeslots:timeslot
        }),
    })
    if (response.ok){
        return response.json();
    }else {
        // Login failed
        console.error("Create service failed");
    }

}