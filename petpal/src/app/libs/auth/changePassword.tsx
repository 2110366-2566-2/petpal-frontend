export async function changePasswordApi(
    pswd:string,
    email:string,
    usertype:string
    ) {
    try{
        const response = await fetch(`http://localhost:8080/change-password`,{
            method:'POST',
            credentials:'include',
            body:JSON.stringify({
                loginType: usertype,
                newPassword: pswd,
                userEmail: email
            })
        })
        if(response.ok){
            return response.json()
        }else{
            console.log('response error while change password')
        }
    }catch(err){
        console.log("Error while fetch change password",err)
    }
}