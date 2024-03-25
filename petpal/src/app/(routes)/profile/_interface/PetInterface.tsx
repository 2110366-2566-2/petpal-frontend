import { adaptorUserToUserInterface } from "./UserInterface"
import { PetType } from "@/app/_enum/Pet/PetType";

import { Pet } from "@/app/_interface/user/pet";

export default interface PetInterface {
  name: string,
  age: number,
  type: PetType;
  behaviouralNotes: string;
  breed: string;
  certificate: string;
  dietyPreferences: string;
  gender: string;
  healthInformation: string;
  ownerUsername: string;
  vaccinations: string;
}

export var examplePet1: PetInterface = {
  name: "Longtuu",
  age: 10,
  type: PetType.CAT,
  behaviouralNotes: "",
  breed: "",
  certificate: "",
  dietyPreferences: "",
  gender: "",
  healthInformation: "",
  ownerUsername: "",
  vaccinations: "",
}

export var examplePet2: PetInterface = {
  name: "LongPoom",
  age: 5,
  type: PetType.DOG,
  behaviouralNotes: "",
  breed: "",
  certificate: "",
  dietyPreferences: "",
  gender: "",
  healthInformation: "",
  ownerUsername: "",
  vaccinations: "",
}

export function adaptorPetToPetInterface(petResponse: Pet) {
  const name: string = petResponse.name as string
  const age: number = petResponse.age as number
  const petTypeValue: string[] = Object.values(PetType)
  let type: PetType = (petTypeValue.includes(petResponse.type!)) ? (petResponse.type as PetType) : (PetType.OTHER)
  const behaviouralNotes: string = petResponse.behaviouralNotes as string
  const breed: string = petResponse.breed as string
  const certificate: string = petResponse.certificate as string
  const dietyPreferences: string = petResponse.dietyPreferences as string
  const gender: string = petResponse.gender as string
  const healthInformation: string = petResponse.healthInformation as string
  const ownerUsername: string = petResponse.ownerUsername as string
  const vaccinations: string = petResponse.vaccinations as string

  const result: PetInterface = {
    name: name,
    age: age,
    type: type,
    behaviouralNotes: behaviouralNotes,
    breed: breed,
    certificate: certificate,
    dietyPreferences: dietyPreferences,
    gender: gender,
    healthInformation: healthInformation,
    ownerUsername: ownerUsername,
    vaccinations: vaccinations,
  }
  return result
}