export default async function deleteBankAccount(userType : string){
    const response = await fetch(`http://localhost:8080/${userType}/deleteBankAccount`)
    if(!response.ok){
        throw new Error("Fail to get default bank account")
    }
    return await response.json()
}