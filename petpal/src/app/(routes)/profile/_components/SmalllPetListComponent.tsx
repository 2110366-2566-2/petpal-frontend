import PetInterface from "@app/(routes)/profile/_interface/PetInterface"
import { PetType } from "@/app/_enum/Pet/PetType"


var getPetEmoji = (petType: string): string => {
    let icon: string
    switch (petType) {
        case PetType.DOG: {
            icon = "🐶"
            break
        }
        case PetType.CAT: {
            icon = "🐱"
            break
        }
        case PetType.OTHER: {
            icon = "👻"
            break
        }
        default: {
            icon = "You forget to add icon"
            break
        }
    }
    return icon
}

export default function SmalllPetListComponent({ pet }: { pet: PetInterface }) {
    return (
        <p className='text-[32px]'>{getPetEmoji(pet.type)} {pet.name}</p>
    )

}