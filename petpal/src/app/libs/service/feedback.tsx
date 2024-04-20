import { API_URL } from "@/app/_constants/env"

export async function getFeedbackApi(
    id:string
){
    const response = await fetch(`${API_URL}/service/feedback/${id}`,{
        method:'GET',
        credentials:'include',
    })
    if(response.ok){
        const res = await response.json()
        return res
    }else{
        console.log('Get service feedback failed')
    }
}
export async function postFeedbackApi(
    id:string,
    content:string,
    rating:number
){
    const response = await fetch(`${API_URL}/service/feedback/${id}`,{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({
            content:content,
            rating:rating
        })
    })
    if(response.ok){
        return response.json()
    }else{
        console.log('Post service feedback failed')
    }

}