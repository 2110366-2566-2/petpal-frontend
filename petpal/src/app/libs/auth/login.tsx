import { API_URL } from "@/app/_constants/env";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
export default async function login(
    email: string,
    registrationType: string,
    password: string
) {
    const response = await fetch( API_URL + "/login", {
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
        toast.success("Login successful");
        const data = await response.json()
        setCookie("token",data?.AccessToken);
        return data;

    } else {
        // Login failed
        toast('Incorrect username/password\nor Account does not exist', {
            icon: '⚠️',
          });
        console.error("Login failed");
    }


    
}
