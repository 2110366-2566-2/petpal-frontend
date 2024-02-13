import PetInterface from "./PetInterface"
import { examplePet1,examplePet2 } from "./PetInterface"

export default interface UserInterface{
    Name:string,
    PetList:PetInterface[]
}

export var exampleUser:UserInterface = {
    Name:"Prame",
    PetList:[
        examplePet1,
        examplePet2
    ]
  }