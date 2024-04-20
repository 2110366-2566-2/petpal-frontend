import { API_URL } from "@/app/_constants/env";
import { ChatResponse } from "@/app/_interface/chat/ChatResponse";

export async function setChatHistoryByRoomId(sendChatResponse: ChatResponse) {
    try {
        const response = await fetch(`${API_URL}/chat/history/${sendChatResponse.roomID}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(sendChatResponse)
        });
        if (response.ok) {
            console.log("updateChat")
            return response.json()
        }

    } catch (error) {
        console.error('Error fetching HistoryUser:', error);
    }
}