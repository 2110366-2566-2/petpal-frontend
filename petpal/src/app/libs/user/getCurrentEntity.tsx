import { API_URL } from "@/app/_constants/env"
import { User, Convert as userConvert } from "@app/_interface/user/user"
import { Svcp, Convert as svcpConvert } from "@/app/_interface/svcp/svcp"
import { getCurrentEntityType, isCurrentEntityTypeUser, isCurrentEntityTypeSvcp } from "./getCurrentEntityType"
export async function getCurrentEntity(): Promise<User | Svcp | undefined> {
    try {
        const response: Response = await fetch(`${API_URL}/current-entity`, {
            method: 'GET',
            credentials: 'include',
        })
        const responeString: string = response.toString()
        const responseJson: object = JSON.parse(responeString)
        let result: User | Svcp | undefined
        if (isCurrentEntityTypeSvcp(responseJson)) {
            result = svcpConvert.toSvcp(responeString) as Svcp
        } else if (isCurrentEntityTypeUser(responseJson)) {
            result = userConvert.toUser(responeString) as User
        }
        return result
    } catch (error) {
        console.error('Error fetching current entity:', error);
    }
}