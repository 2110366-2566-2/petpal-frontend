export default async function createServiceApi(
    price:number,
    serviceDescription:string,
    serviceName:string,
    serviceType:string,
    timeslot:Array<Object>
){
    console.log("In api", timeslot)
    const response = await fetch('http://localhost:8080/service/create' , {
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