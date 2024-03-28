export async function getChatHistorySvcp() {
    try {
        const response = await fetch('http://localhost:8080/serviceproviders/chats', {
            method: 'GET',
            credentials: 'include',
        });
        return await response.json();

    } catch (error) {
        console.error('Error fetching current entity:', error);
    }
}