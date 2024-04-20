import { API_URL } from "@/app/_constants/env"

export async function editSvcpProfile(
    SVCPusername?:string,
    description?:string,
    address?:string,
    phoneNumber?:string,
    profileImg?:string,
    addiImg?:string
    ){
    console.log("In api edit svcp image",profileImg)
    const response = await fetch(`${API_URL}/serviceproviders/`,{
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