import { getCurrentEntity } from "./getCurrentEntity";
import { Svcp } from "@/app/_interface/svcp/svcp";

export async function getCurrentEntitySvcp(): Promise<Svcp> {
    try {
        const CurrentEntitySvcp: Svcp = await getCurrentEntity() as Svcp
        return CurrentEntitySvcp
    } catch (error) {
        console.error('Error get current entity user:', error);
        const defaultSvcp: Svcp = {}
        return defaultSvcp
    }
}