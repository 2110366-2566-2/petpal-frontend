import { API_URL } from "@/app/_constants/env";

export default async function registerUser(
    address: string,
    dateOfBirth: string,
    email: string,
    fullName: string,
    password: string,
    phoneNumber: string,
    username: string
) {
    const response = await fetch(API_URL + "/register-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address: address,
            dateOfBirth: dateOfBirth + "T00:00:00Z",
            email: email,
            fullName: fullName,
            password: password,
            phoneNumber: phoneNumber,
            username: username,
        }),
    });

    if (response.ok) {
        // Register successful
        console.log("Register successful");
        console.log(response.status);
    } else {
        // Register failed
        console.error("Register failed");
        try {
            const errorMessage = await response.text();
            console.error("Error message:", errorMessage);
        } catch (error) {
            console.error("Failed to parse error message:", error);
        }
    }

    return await response.json();
}
