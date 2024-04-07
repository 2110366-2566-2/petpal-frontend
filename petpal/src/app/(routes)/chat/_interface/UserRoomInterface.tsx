import { EntityType } from "@/app/_enum/currentEntity/EntityType";

export default interface UserRoomInterface {
    Id: string,
    Username: string,
    Role: EntityType,
}