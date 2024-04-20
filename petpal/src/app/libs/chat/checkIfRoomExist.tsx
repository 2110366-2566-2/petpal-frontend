import { API_URL } from "@/app/_constants/env";

export async function checkIfRoomExist(roomId: string) {
    try {
        const response = await fetch(`${API_URL}/chat/history/${roomId}`, {
            method: 'GET',
            credentials: 'include',
        });
        const res = await response.json();
        if ("roomID" in res) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.error('Error fetching current entity:', error);
    }
}
