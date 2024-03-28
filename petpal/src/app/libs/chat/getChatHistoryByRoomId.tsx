import { ChatResponse } from "@/app/_interface/chat/ChatResponse";

export async function getChatHistoryByRoomId(roomId: string) {
    try {
        const response = await fetch(`http://localhost:8080/chat/history/${roomId}`, {
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