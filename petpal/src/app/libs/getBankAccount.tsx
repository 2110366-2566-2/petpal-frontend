export default async function getBankAccount(userType : string){
    const response = await fetch(`http://localhost:8080/${userType}/me`)
    if(!response.ok){
        throw new Error("Fail to get default bank account")
    }
    return await response.json()
}