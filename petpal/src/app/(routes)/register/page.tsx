"use client";
import React, { ChangeEvent, useState } from "react";
import Button from "@app/(routes)/register/_components/Button";
import registerUser from "@app/libs/auth/registerUser";
import registerSVCP from "@app/libs/auth/registerSVCP";
import { useRouter } from "next/navigation";

export default function Register() {
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [serviceType, setServiceType] = useState("");

    const [registrationType, setRegistrationType] = useState("User");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();
    const handleRegistrationTypeChange = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        setRegistrationType(e.target.value);
        // console.log(registrationType);
    };

    const handleServiceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setServiceType(e.target.value);
    };
    const handleSubmit = async () => {
        // Validate form fields
        // console.log(address);
        // console.log(dateOfBirth + "T00:00:00Z");
        // console.log(email);
        // console.log(fullName);
        // console.log(password);
        // console.log(password2);
        // console.log(phoneNumber);
        // console.log(username);
        // console.log(serviceType);
        // console.log(registrationType);
        if (registrationType === "User") {
            if (
                !email.trim() ||
                !password.trim() ||
                !password2.trim() ||
                !username.trim() ||
                !address.trim() ||
                !dateOfBirth.trim() ||
                !fullName.trim() ||
                !phoneNumber.trim()
            ) {
                setErrorMessage(" Please fill all fields");
                return;
            }
        } else if (registrationType === "Service Provider") {
            if (
                !email.trim() ||
                !password.trim() ||
                !password2.trim() ||
                !username.trim()
            ) {
                setErrorMessage(" Please fill all fields");
                return;
            }
        }

        if (password != password2) {
            setErrorMessage(" Passwords do not match. Please try again.");
            return;
        }
        // console.log(dateOfBirth);
        if (registrationType === "User") {
            try {
                const newUser = await registerUser(
                    address,
                    dateOfBirth,
                    email,
                    fullName,
                    password,
                    phoneNumber,
                    username
                );
                if (newUser) {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error during register:", error);
            }
        } else if (registrationType === "Service Provider") {
            try {
                const newSVCP = await registerSVCP(
                    email,
                    password,
                    serviceType,
                    username,
                    phoneNumber,
                    address
                );
                if (newSVCP) {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error during register:", error);
            }
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
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Address</span>
                    <input
                        type="text"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="123 Main Street"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="w-[75%] m-3">
                    <span className="text-gray-700">Date of Birth</span>
                    <input
                        type="date"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="2/1/02"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
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
                    <span className="text-gray-700">Confirm password</span>
                    <input
                        type="password"
                        className="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm
           focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
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
                            value={serviceType}
                            onChange={handleServiceTypeChange}
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
