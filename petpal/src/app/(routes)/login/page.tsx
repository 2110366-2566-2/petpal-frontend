"use client";
import React, { ChangeEvent, useState } from "react";
import Button from "../register/_components/Button";
import login from "@/app/libs/auth/login";

export default function Login() {
    const [registrationType, setRegistrationType] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegistrationTypeChange = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        setRegistrationType(e.target.value);
    };
    const handleSubmit = async () => {
        // Validate form fields
        if (!email.trim() || !password.trim()) {
            setErrorMessage("Email and password are required.");
            return;
        }

        try {
            login(email, registrationType, password);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    return (
        <main className="flex flex-col items-center ">
            <div className="flex flex-col items-center w-[742px] h-full p-10 border-2">
                <div className="text-[#FF872F] text-[48px] font-bold ">
                    LOGIN
                </div>

                {errorMessage && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}

                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Email address</span>
                    <input
                        type="email"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="skibidi@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Login as</span>
                    <select
                        className="p-1 block w-full mt-1 rounded-md border-gray-300 shadow-sm
         focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={registrationType}
                        onChange={handleRegistrationTypeChange}
                    >
                        <option value="user">User</option>
                        <option value="svcp">Service Provider</option>
                    </select>
                </div>
                <Button name="LOGIN" onClick={handleSubmit} />
                <span className="mt-4 text-gray-700 text-[15px]">
                    Need an account?{" "}
                    <a href="./register" className="underline">
                        SIGN UP
                    </a>
                </span>
            </div>
        </main>
    );
}
