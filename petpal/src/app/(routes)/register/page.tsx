"use client";
import React, { ChangeEvent, useState } from "react";
import Button from "./_components/Button";

export default function Register() {
    const [registrationType, setRegistrationType] = useState("User");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegistrationTypeChange = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        setRegistrationType(e.target.value);
    }; 
    const handleSubmit = () => {
        // Validate form fields
        if (!username.trim() || !email.trim()) {
            setErrorMessage("Username and email are required.");
            return;
        }
    };

    return (
        <main className="flex flex-col items-center ">
            <div className="flex flex-col items-center w-[742px] h-full p-10 border-2">
                <div className="text-[#FF872F] text-[48px] font-bold ">
                    Create an account
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
                    <span className="text-gray-700">Username</span>
                    <input
                        type="text"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Full name</span>
                    <input
                        type="text"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Firstname Lastname"
                    />
                </div>
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
                    <span className="text-gray-700">Phone number</span>
                    <input
                        type="tel"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="xxxxxxxxxx"
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="password"
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Confirm password</span>
                    <input
                        type="password"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="password"
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Register as</span>
                    <select
                        className="p-1 block w-full mt-1 rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={registrationType}
                        onChange={handleRegistrationTypeChange}
                    >
                        <option>User</option>
                        <option>Service Provider</option>
                    </select>
                </div>
                {registrationType === "Service Provider" && (
                    <div className="w-[75%] m-3">
                        <span className="text-gray-700">Service type</span>
                        <select
                            className="p-1 block w-full mt-1 rounded-md border-gray-300 shadow-sm
                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option>Healthcare</option>
                            <option>Dog walker</option>
                            <option>Grooming</option>
                            <option>Other</option>
                        </select>
                    </div>
                )}
                <Button name="Register" onClick={handleSubmit} />
            </div>
        </main>
    );
}
