import React from "react";

interface ButtonProps {
    name: string;
    onClick?: () => void;
}

export default function ConfirmAppointmentButton({
    name,
    onClick,
}: ButtonProps) {
    return (
        <button
            className="py-2 px-5 bg-[#FF872F] text-[#ffffff] text-[24px] rounded-lg text-white font-medium  shadow-md hover:bg-orange-500 
      focus:outline-none focus:ring focus:ring-orange-400 focus:ring-opacity-75 w-full"
            onClick={onClick}
        >
            {name}
        </button>
    );
}
