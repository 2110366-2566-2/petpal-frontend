import { API_URL } from "@/app/_constants/env";
import { ChatResponse } from "@/app/_interface/chat/ChatResponse";

export async function getChatHistoryByRoomId(roomId: string) {
    try {
        const response = await fetch(`${API_URL}/chat/history/${roomId}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            return response.json()
        }

    } catch (error) {
        console.error('Error fetching HistoryUser:', error);
    }
}