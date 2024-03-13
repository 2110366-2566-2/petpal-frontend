
"use client";
import getBookingHistory from "@/app/libs/getBookingHistory";
import React, { useState, useEffect } from "react";
import Booking from "../../../_interface/Booking";
import cancelBooking from "@/app/libs/cancelBooking";

function formatTimeToHourMinute(datetimeString: string) {
    const date = new Date(datetimeString);
    // Use 'getHours' and 'getMinutes' to extract time parts
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // Pad single digits with leading zero
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    // Combine hours and minutes in HH:mm format
    return `${formattedHours}:${formattedMinutes}`;
}

function formatDate(datetimeString: string) {
    const date = new Date(datetimeString);
    // Corrected options with specific string literals for TypeScript
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    // Adjust 'en-US' to your preferred locale if needed
    return date.toLocaleDateString("en-US", options);
}

function getBookingStatus(booking: Booking): string {
    if (booking.status.userCompleted) {
        return "Completed";
    } else if (booking.status.svcpCompleted) {
        return "Service Completed";
    } else if (booking.status.paymentStatus) {
        return "Paid";
    } else if (booking.status.svcpConfirmed) {
        return "Confirmed";
    } else if (!booking.status.svcpConfirmed) {
        return "Pending";
    } else if (booking.cancel.cancelStatus) {
        return "Cancel";
    } else {
        return "";
    }
}

export default function BookingHistory() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    // useEffect hook to fetch bookings when component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingHistory();
                setBookings(response.result);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);
    const handleCancel = async (id: string, reason: string) => {
        cancelBooking(id, reason);
    };
    return (
        <main className="flex flex-col items-center pt-10">
            {bookings.map((booking, index) => (
                <div
                    key={index}
                    className="flex flex-col xl:flex-row xl:justify-between xl:items-center bg-[#F9F9F9] w-[327px] xl:w-[82%] mb-4 p-[18px] rounded-xl drop-shadow-lg"
                >
                    <div className="flex flex-col xl:flex-row xl:justify-between">
                        {/* Mobile: Service Name and Status on one row, centered. Desktop: Status moves to the left. */}
                        <div className="flex justify-between xl:justify-start items-center w-full xl:w-auto space-x-2 xl:mr-[90px]">
                            <div className="font-bold text-[24px] xl:hidden">
                                {booking.serviceName} {/* Visible on Mobile */}
                            </div>
                            <div className="font-medium text-[18px] text-[#12B837]">
                                {getBookingStatus(booking)}
                            </div>
                        </div>
                        {/* Provider Name: Below on mobile, in a box on the right on desktop */}
                        <div className="mt-2 xl:mt-0 xl:flex xl:items-center xl:justify-end xl:w-auto">
                            <div className="text-left">
                                <div className="font-bold text-[24px] hidden xl:block">
                                    {booking.serviceName}{" "}
                                    {/* Hidden on Mobile, visible on Desktop */}
                                </div>
                                <div className="font-bold text-[18px] text-[#858585]">
                                    {booking.SVCPName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="font-medium text-[24px] xl:mr-[20px]">
                            {formatDate(booking.startTime)}
                        </div>
                        <div className="font-medium text-[24px]">
                            {formatTimeToHourMinute(booking.startTime)} -{" "}
                            {formatTimeToHourMinute(booking.endTime)}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium text-[32px]">
                            {booking.totalBookingPrice}฿
                        </div>
                        <div className="flex xl:hidden">
                            <div className="font-bold text-[16px] text-[#FFD600]">
                                Reschedule
                            </div>
                            <div className="font-bold text-[16px] ml-3 text-[#FF5858]">
                                Cancel
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="hidden xl:flex">
                            <div className="font-bold text-[16px] text-[#FFD600]">
                                Reschedule
                            </div>
                            <button
                                onClick={() =>
                                    handleCancel(booking.bookingID, "")
                                }
                            >
                                <div className="font-bold text-[16px] ml-3 text-[#FF5858]">
                                    Cancel
                                </div>
                            </button>
                        </div>
                        <div className="text-right font-semibold text-[16px] text-[#858585]">
                            Write Feedback
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}

