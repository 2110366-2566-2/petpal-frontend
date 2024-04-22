import { API_URL } from "@/app/_constants/env";

export default async function registerSVCP(
    email: string,
    password: string,
    serviceType: string,
    username: string,
    phoneNumber : string,
    address : string
) {
    const response = await fetch(API_URL + "/register-svcp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            SVCPEmail: email,
            SVCPPassword: password,
            SVCPServiceType: serviceType,
            SVCPUsername: username,
            phoneNumber : phoneNumber,
            address : address
        }),
    });

    if (response.ok) {
        // Register successful
        console.log("Register successful");
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
