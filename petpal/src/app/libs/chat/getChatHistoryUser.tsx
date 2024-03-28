export async function getChatHistoryUser() {
    try {
        const response = await fetch('http://localhost:8080/user/chats', {
            method: 'GET',
            credentials: 'include',
        });
        // const response = await fetch('http://localhost:8080/user/chats', {
        //     method: 'GET',
        //     credentials: 'include',
        // });
        return await response.json();

    } catch (error) {
        console.error('Error fetching HistoryUser:', error);
    }
}