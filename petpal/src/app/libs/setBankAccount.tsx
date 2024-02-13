export default async function setBankAccount(userType : string){
    const response = await fetch(`http://localhost:8080/${userType}/setDefaultBankAccount`)
    if(!response.ok){
        throw new Error("Fail to get default bank account")
    }
    return await response.json()
}