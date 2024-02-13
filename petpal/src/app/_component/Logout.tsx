"use client";
import React from "react";

interface LogoutButtonProps {
    onClick: () => void;
}

function LogoutButton({ onClick }: LogoutButtonProps) {
    return (
        <button
            type="button"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
            focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            onClick={onClick}
        >
            Logout
        </button>
    );
}

export default LogoutButton;
