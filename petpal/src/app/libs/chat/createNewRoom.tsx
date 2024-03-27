import { ChatResponse } from "@/app/_interface/chat/ChatResponse";

export async function craeteNewRoom(chatResponse: ChatResponse) {
    try {
        const response = await fetch(`http://localhost:8080/chat/history/${chatResponse.roomID}`, {
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