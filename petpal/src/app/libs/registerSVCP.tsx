export default async function registerSVCP(
    email: string,
    password: string,
    serviceType: string,
    username: string
) {
    const response = await fetch("http://localhost:8080/register-svcp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            SVCPEmail: email,
            SVCPPassword: password,
            SVCPServiceType: serviceType,
            SVCPUsername: username,
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
