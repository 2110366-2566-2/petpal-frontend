import { API_URL } from "@/app/_constants/env"

export async function editUserProfile(
    username:string
) {
    try
    {
        const response = await fetch(`${API_URL}/user/`,{
            method:'PUT',
            credentials:'include',
            body: JSON.stringify({
                username:username
            })
        })
        if(response.ok){
            return response.json()
        }
    }catch(err){
        console.log("Error while put api edituserprofile",err)
    }
}