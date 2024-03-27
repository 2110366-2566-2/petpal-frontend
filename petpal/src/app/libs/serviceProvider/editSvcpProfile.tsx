export async function editSvcpProfile(
    SVCPusername?:string,
    description?:string,
    address?:string,
    phoneNumber?:string,
    profileImg?:string,
    addiImg?:string
    ){
    console.log("In api edit svcp image",profileImg)
    const response = await fetch(`http://localhost:8080/serviceproviders/`,{
        method:'PUT',
        credentials:'include',
        body:JSON.stringify({
            SVCPUsername:SVCPusername,
            description:description,
            address:address,
            phoneNumber:phoneNumber,
            // SVCPAdditionalImg:addiImg
        })
    })
    if(response.ok){
        return response.json()
    }else{
        console.log('Error to editSvcpProfile')
    }
}