export default async function uploadImgApi(file:File) {
    const formData = new FormData();
    formData.set('profileImage', file);
    const response  = await fetch(`http://localhost:8080/user/uploadProfileImage`,{
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