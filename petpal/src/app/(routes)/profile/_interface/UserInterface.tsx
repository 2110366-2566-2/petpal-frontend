import PetInterface from "./PetInterface"
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
    // const name: string = respone.username as string
    // const PetList: PetInterface[]
    // const result: UserInterface = {
    //     Name: name,
    //     PetList: []
    // }
    return exampleUser
}