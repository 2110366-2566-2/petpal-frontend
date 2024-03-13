import { setCookie } from "cookies-next";

export default async function login(
    email: string,
    registrationType: string,
    password: string
) {
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            logintype: registrationType,
            password: password,
        }),
    });
    if (response.ok) {
        // Login successful
        console.log("Login successful");
        // set cookie
        const data = await response.json();
        setCookie("token", data.AccessToken);
        
    } else {
        // Login failed
        console.error("Login failed");
    }

    return await response.json();
}
