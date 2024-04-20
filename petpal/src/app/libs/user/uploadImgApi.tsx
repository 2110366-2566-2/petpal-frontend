import { API_URL } from "@/app/_constants/env";

export default async function uploadImgApi(file:File) {
    const formData = new FormData();
    formData.set('profileImage', file);
    const response  = await fetch(`${API_URL}/user/uploadProfileImage`,{
        method:'POST',
        credentials:'include',
        body:formData
    })
    if(response.ok){
        return response.json()
    }else{
        return console.log('cannot upload image')
    }
}