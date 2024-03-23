export async function getUserById(id: string) {
    const response = await fetch(
        `http://localhost:8080/user/${id}`,
        {
            method: "GET",
        }
    );
    if (response.ok) {
    } else {
        console.log("get User failed");
    }
    return await response.json();
}