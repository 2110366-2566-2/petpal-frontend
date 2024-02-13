"use client";
import React from "react";

interface ButtonProps {
    name: string;
    onClick?: () => void;
}

export default function Button({ name, onClick }: ButtonProps) {
    return (
        <button
            className="m-3 py-2 px-5 bg-[#FF872F] text-white font-semibold rounded-full shadow-md hover:bg-orange-500 
      focus:outline-none focus:ring focus:ring-orange-400 focus:ring-opacity-75"
            onClick={onClick}
        >
            {name}
        </button>
    );
}
