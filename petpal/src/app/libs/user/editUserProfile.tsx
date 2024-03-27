export async function editUserProfile(
    username:string
) {
    try
    {
        const response = await fetch(`http://localhost:8080/user/`,{
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