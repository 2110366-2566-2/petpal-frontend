export async function getFeedbackApi(
    id:string
){
    const response = await fetch(`http://localhost:8080/service/feedback/${id}`,{
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
    console.log("in api post",id,content,rating)
    const response = await fetch(`http://localhost:8080/service/feedback/${id}`,{
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