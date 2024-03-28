import PetInfoInterface from "@/app/(routes)/profile/_interface/PetInfoInterface"

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
 
export async function addPet(pet:PetInfoInterface) {
    pet.age = Number(pet.age)
    const response = await fetch("http://localhost:8080/user/pets/",{
        method:'POST',
        credentials:'include',
        body: JSON.stringify(pet)
    })
    if(response.ok){
        return response.json()
    }else{
        console.log("error to add a pet")
    }
}

export async function editPetInfo(
    idx:Number,
    pet:PetInfoInterface
) {
    const response = await fetch(`http://localhost:8080/user/pets/${idx}`,{
        method:'PUT',
        credentials:'include',
        body: JSON.stringify(pet)
    })
    if(response.ok){
        return response.json()
    }else{
        console.log("error to edit a pet info")
    }
}

export async function deletePet(
    idx:Number
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