import { adaptorUserToUserInterface } from "./UserInterface"

import { Pet } from "@/app/_interface/user/pet";

export default interface PetInterface{
    Name:string,
    Type:string,
}

export var examplePet1:PetInterface = {
    Name:"Longtuu",
    Type:"Cat"
  }

export var examplePet2:PetInterface = {
    Name:"LongPoom",
    Type:"Dog"
  }

// export adaptorPetToPetInterface(response:Pet){
  
// }