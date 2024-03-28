import { MessageResponse } from "./MessageResponse"
export interface ChatResponse {
    dateCreated?: string,
    messages?: MessageResponse[],
    roomID?: string,
    user0ID?: string,
    user0Type?: string,
    user1ID?: string,
    user1Type?: string
}