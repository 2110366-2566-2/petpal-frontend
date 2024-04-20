import { API_URL } from "@/app/_constants/env";

export async function getUserById(id: string) {
    const response = await fetch(
        `${API_URL}/user/${id}`,
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