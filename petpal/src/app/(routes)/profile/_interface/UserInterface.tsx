import { Pet } from "@/app/_interface/user/pet";
import PetInterface, { adaptorPetToPetInterface } from "./PetInterface"
import { examplePet1, examplePet2 } from "./PetInterface"
import { User } from "@/app/_interface/user/user";

export default interface UserInterface {
    Name: string,
    PetList: PetInterface[]
}

export var exampleUser: UserInterface = {
    Name: "Prame",
    PetList: [
        examplePet1,
        examplePet2
    ]
}

export function adaptorUserToUserInterface(respone: User): UserInterface {
    const name: string = respone.username as string
    let PetList: PetInterface[] = respone.pets!.map((pet: Pet) => adaptorPetToPetInterface(pet))
    const result: UserInterface = {
        Name: name,
        PetList: PetList
    }
    return result
}