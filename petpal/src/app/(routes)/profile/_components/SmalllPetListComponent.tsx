import PetInterface from "../_interface/PetInterface"


var getPetEmoji = (PetType:string):string => {
    var petEmoji = {
        "Dog":"🐶",
        "Cat":"🐱",
      }
    if (PetType in petEmoji) return petEmoji[PetType as keyof typeof petEmoji]
    else return "👻"
}

export default function SmalllPetListComponent({Pet}:{Pet:PetInterface}){
    return(
        <p className='text-[32px]'>{getPetEmoji(Pet.Type)} {Pet.Name}</p>
    )

}