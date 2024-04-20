import { API_URL } from "@/app/_constants/env";
import { ChatResponse } from "@/app/_interface/chat/ChatResponse";

export async function craeteNewRoom(chatResponse: ChatResponse) {
    try {
        const response = await fetch(`${API_URL}/chat/history`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(chatResponse)
        });
        if (response.ok) {
            console.log("CreateChat")
            return response.json()
        }

    } catch (error) {
        console.error('Error fetching HistoryUser:', error);
    }
}