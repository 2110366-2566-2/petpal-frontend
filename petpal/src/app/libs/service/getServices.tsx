export default async function getServices(){
    const response = await fetch(`http://localhost:8080/service/searching`)
    if(!response.ok){
        throw new Error("Fail to fetch services")
    }
    return await response.json()
}