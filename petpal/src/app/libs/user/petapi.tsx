export async function getPets() {

    const response = await fetch(`http://localhost:8080/user/pets/me`,{
        method:'GET',
        credentials:'include'
    })
    if(response.ok){
        return response.json()
    }else{
        console.log("error get current user pets")
    }
    
}

export async function addPet() {
    const response = await fetch(`http://localhost:8080/user/pets`,{
        method:'POST',
        credentials:'include',
        body: JSON.stringify({
                age: 0,
                behaviouralNotes: "string",
                breed: "string",
                certificate: "string",
                dietyPreferences: "string",
                gender: "string",
                healthInformation: "string",
                name: "string",
                type: "string",
                vaccinations: "string"
        })
    })
    if(response.ok){
        return response.json()
    }else{
        console.log("error to add a pet")
    }
}

export async function editPetInfo(
    idx:string
) {
    const response = await fetch(`http://localhost:8080/user/pets/${idx}`,{
        method:'PUT',
        credentials:'include',
        body: JSON.stringify({
                age: 0,
                behaviouralNotes: "string",
                breed: "string",
                certificate: "string",
                dietyPreferences: "string",
                gender: "string",
                healthInformation: "string",
                name: "string",
                type: "string",
                vaccinations: "string"
        })
    })
    if(response.ok){
        return response.json()
    }else{
        console.log("error to edit a pet info")
    }
}

export async function deletePet(
    idx:string
) {
    const response = await fetch(`http://localhost:8080/user/pets/${idx}`,{
        method:'DELETE',
        credentials:'include',
    })
    if(response.ok){
        return response.json()
    }else{
        console.log("error to delete a pet info")
    }
}