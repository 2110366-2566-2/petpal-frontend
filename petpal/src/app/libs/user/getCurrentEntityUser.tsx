import { getCurrentEntity } from "./getCurrentEntity";
import { User } from "@/app/_interface/user/user";

export async function getCurrentEntityUser(): Promise<User> {
    try {
        const CurrentEntityUser: User = await getCurrentEntity() as User
        return CurrentEntityUser
    } catch (error) {
        console.error('Error get current entity user:', error);
        const defaultUser: User = {}
        return defaultUser
    }
}