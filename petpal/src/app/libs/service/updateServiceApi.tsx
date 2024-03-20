export default async function updateServiceAPI(
    serviceID:string,
    serviceName:string,
    serviceType:string,
    serviceDescription:string,
    price:number,
    timeslots:Array<Object>
) {
    const url = `http://localhost:8080/service/${serviceID}`;
    const response = await fetch(url , {
        method:'PATCH',
        credentials:'include',
        body: JSON.stringify({
            serviceName:serviceName,
            serviceType:serviceType,
            serviceDescription:serviceDescription,
            price:price,
            timeslots:timeslots
        }),
    })
    if (response.ok){
        console.log("Update service success")
    }else{
        console.error("Update service failed");
    }
    return await response.json();
}