export async function checkIfRoomExist(roomId: string) {
    try {
        const response = await fetch(`http://localhost:8080/chat/history/${roomId}`, {
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
