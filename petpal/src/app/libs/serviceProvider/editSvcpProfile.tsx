export async function editSvcpProfile(
    SVCPusername?:string,
    description?:string,
    address?:string,
    phoneNumber?:string,
    ){
    const response = await fetch(`http://localhost:8080/serviceproviders/`,{
        method:'PUT',
        credentials:'include',
        body:JSON.stringify({
            SVCPusername:SVCPusername,
            description:description,
            address:address,
            phoneNumber:phoneNumber
        })
    })
    if(response.ok){
        return response.json()
    }else{
        console.log('Error to editSvcpProfile')
    }
}