export async function getCurrentEntity() {
    try {
        const response = await fetch('http://localhost:8080/current-entity', {
            method: 'GET',
            credentials: 'include',
        });

        return await response.json();

    } catch (error) {
        console.error('Error fetching current entity:', error);
    }
}