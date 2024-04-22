import { API_URL } from "@/app/_constants/env";

export async function getChatHistorySvcp() {
    try {
        const response = await fetch(API_URL + '/serviceproviders/chats', {
            method: 'GET',
            credentials: 'include',
        });
        return await response.json();

    } catch (error) {
        console.error('Error fetching current entity:', error);
    }
}