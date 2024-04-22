import { API_URL } from "@/app/_constants/env";

export async function getChatHistoryUser() {
    try {
        const response = await fetch(API_URL + '/user/chats', {
            method: 'GET',
            credentials: 'include',
        });
        // const response = await fetch(API_URL + '/user/chats', {
        //     method: 'GET',
        //     credentials: 'include',
        // });
        return await response.json();

    } catch (error) {
        console.error('Error fetching HistoryUser:', error);
    }
}