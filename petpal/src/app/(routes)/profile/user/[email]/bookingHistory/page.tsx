"use client";
import getBookingHistory from "@app/libs/service/getBookingHistory";
import React, { useState, useEffect, Suspense } from "react";
import Booking from "@app/(routes)/profile/_interface/Booking";
import cancelBooking from "@app/libs/service/cancelBooking";
import Paymentcard from "./_components/Paymentcard";
import Link from "next/link";
import getQRpayment from "@/app/libs/service/getQRpayment";
import SkeletonList from "./_components/SkeletonList";
import RescheduleForm from "./_components//Reschedule";
import { Modal, Box, Typography } from "@mui/material";
import {
    formatTimeToHourMinute,
    formatDate,
} from "@app/libs/service/formatDate";
import { useRouter } from "next/navigation";

const modalBoxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
};

function getBookingStatus(booking: Booking): string {
    // if (booking.status.userCompleted) {
    //     return "Completed";
    // } else if (booking.status.svcpCompleted) {
    //     return "Service Completed";
    // } else if (booking.status.paymentStatus) {
    //     return "Paid";
    // } else if (booking.status.svcpConfirmed) {
    //     return "Confirmed";
    // } else if (!booking.status.svcpConfirmed) {
    //     return "Pending";
    // } else if (booking.cancel.cancelStatus) {
    //     return "Cancel";
    // } else {
    //     return "";
    // }

    if (booking.cancel.cancelStatus) {
        return "Cancelled";
    } else {
        return booking.statusString;
    }
}

export default function BookingHistory() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const router = useRouter();
    // useEffect hook to fetch bookings when component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingHistory();
                setBookings(response.result);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // This will hide the loading spinner after 2 seconds if bookings are still null
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading && bookings === null) {
                setIsLoading(false);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [isLoading, bookings]);

    const handleCancel = async (id: string, reason: string) => {
        cancelBooking(id, reason);
    };
    const handleRefund = async (id: string) => {
        router.push("/help/refund?bookingid=" + id);
    };

    const [qrCode, setQRCode] = useState<string | null>(null); // State to hold the QR code
    const [selectedBookingID, setSelectedBookingID] = useState<string | null>(
        null
    ); // State to hold the selected booking ID
    const [selectedServiceName, setSelectedServiceName] = useState<
        string | null
    >(null);

    useEffect(() => {
        const handlePayNow = async () => {
            if (selectedBookingID) {
                try {
                    const qrCodeData = await getQRpayment(selectedBookingID); // Fetch QR code
                    if (qrCodeData !== undefined) {
                        setQRCode(qrCodeData.qrImage); // Set QR code in state if qrCodeData is defined
                    } else {
                        setQRCode("/loadingcar.jpg");
                        console.error("QR code data is undefined");
                    }
                    console.log(qrCodeData);
                } catch (error) {
                    console.error("Error fetching QR code:", error);
                }
            }
        };

        handlePayNow(); // Call handlePayNow when selectedBookingID changes
    }, [selectedBookingID]);

    const [openReschedule, setOpenReschedule] = React.useState(false);
    const [selectedReschedule, setselectedReschedule] = useState<
        [string, string, string] | [null, null, null]
    >([null, null, null]);
    // const [selectedTimeSlotId, setselectedTimeSlotId] = useState<string | null>(null);
    // const [selectedBookingIDReschedule, setselectedBookingIDReschedule] = useState<string | null>(null);
    const handleOpenReschedule = () => setOpenReschedule(true);
    const handleCloseReschedule = () => {
        setOpenReschedule(false);

        // setselectedTimeSlotId(null);
        // setSelectedBookingID(null);
    };

    return (
        <main className="flex flex-col items-center pt-10">
            {qrCode && (
                <Paymentcard
                    onClose={() => {
                        setQRCode(null);
                        setSelectedBookingID(null);
                    }} // Reset QR code when closing Paymentcard
                    qrCode={qrCode} // Pass QR code to Paymentcard
                    bookingID={selectedBookingID} // Pass bookingID
                    serviceName={selectedServiceName} // Pass serviceName
                />
            )}

            <Modal
                open={openReschedule}
                onClose={handleCloseReschedule}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalBoxStyle}>
                    {openReschedule && (
                        <RescheduleForm
                            bookingID={selectedReschedule[0]}
                            serviceID={selectedReschedule[1]}
                            timeslotID={selectedReschedule[2]}
                            onClose={handleCloseReschedule}
                        />
                    )}
                </Box>
            </Modal>

            {bookings && bookings.length > 0 ? (
                bookings.map((booking, index) => (
                    <div
                        key={index}
                        className="flex flex-col xl:flex-row xl:justify-between xl:items-center bg-[#F9F9F9] w-[327px] xl:w-[82%] mb-4 p-[18px] rounded-xl drop-shadow-lg"
                    >
                        <div className="flex flex-col xl:flex-row xl:justify-between">
                            {/* Mobile: Service Name and Status on one row, centered. Desktop: Status moves to the left. */}
                            <div className="font-bold text-[24px] xl:hidden">
                                    {booking.serviceName}{" "}
                                    {/* Visible on Mobile */}
                                </div>
                            <div className="flex justify-between xl:justify-start items-center w-full xl:w-auto space-x-2 xl:mr-[90px]">
                                
                                <div className="flex flex-col font-medium text-[18px] xl:min-w-[170px] text-[#12B837]">
                                    {getBookingStatus(booking)}
                                    {getBookingStatus(booking) == "Pending Payment" && (
                                        <button
                                            onClick={() => {
                                                setSelectedBookingID(
                                                    booking.bookingID
                                                );
                                                setSelectedServiceName(
                                                    booking.serviceName
                                                );
                                            }}
                                            className="max-w-[90px] text-blue border rounded-xl my-2 p-1 hover:bg-blue hover:text-white"
                                        >
                                            Pay now
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/* Provider Name: Below on mobile, in a box on the right on desktop */}
                            <div className="mt-2 xl:mt-0 xl:flex xl:items-center xl:justify-start xl:w-auto">
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
                        
                            <div className="font-medium text-[24px] xl:mr-[20px]">
                                {formatDate(booking.startTime)}
                            </div>
                            <div className="font-medium text-[24px]">
                                {formatTimeToHourMinute(booking.startTime)} -{" "}
                                {formatTimeToHourMinute(booking.endTime)}
                            </div>
                        
                        
                            <div className="font-medium text-[32px]">
                                {booking.totalBookingPrice.toFixed(2)}฿
                            </div>
                      
                        <div className="flex xl:hidden">
                                <button
                                    className="font-bold text-[16px] text-[#FFD600]"
                                    onClick={() => {
                                        setselectedReschedule([
                                            booking.bookingID,
                                            booking.serviceID,
                                            booking.timeslotID,
                                        ]);
                                        handleOpenReschedule();
                                    }}
                                >
                                    Reschedule
                                </button>
                                <div className="font-bold text-[16px] ml-3 text-[#FF5858]">
                                    Cancel
                                </div>
                            </div>
                        <div className="flex xl:hidden pl-50 ">
                            <button
                                    onClick={() => handleRefund(booking.bookingID)}
                                    >
                                    <div className="font-bold text-[16px]  text-[#3366ff]">
                                        Refund
                                    </div>

                                    </button>
                                    <div className="text-right ml-3 font-semibold text-[16px] text-[#858585]">
                                Write Feedback
                            </div>
                            </div>
                        <div>
                            <div className="hidden xl:flex">
                                <button
                                    className="font-bold text-[16px] text-[#FFD600]"
                                    onClick={() => {
                                        setselectedReschedule([
                                            booking.bookingID,
                                            booking.serviceID,
                                            booking.timeslotID,
                                        ]);
                                        handleOpenReschedule();
                                    }}
                                >
                                    Reschedule
                                </button>
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
                            <div className="hidden xl:flex">
                            <button
                                    onClick={() => handleRefund(booking.bookingID)}
                                    >
                                    <div className="font-bold text-[16px]  text-[#3366ff]">
                                        Refund
                                    </div>

                                    </button>
                                    <div className="text-right ml-3 font-semibold text-[16px] text-[#858585]">
                                Write Feedback
                            </div>
                            </div>

                           
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col">
                    {isLoading && (
                        <div>
                            <SkeletonList />
                            <SkeletonList />
                            <SkeletonList />
                            <SkeletonList />
                            <SkeletonList />
                        </div>
                    )}
                    {!isLoading && (
                        <div className="flex flex-col justify-center items-center text-3xl pt-48 gap-9">
                            <span>No Bookings yet</span>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
