"use client";
import getQRpayment from "@/app/libs/service/getQRpayment";
import Booking from "@app/(routes)/profile/_interface/Booking";
import cancelBooking from "@app/libs/service/cancelBooking";
import completeBooking  from "@app/libs/service/completeBooking";
import {
    formatDate,
    formatTimeToHourMinute,
} from "@app/libs/service/formatDate";
import getBookingHistory from "@app/libs/service/getBookingHistory";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RescheduleForm from "./_components//Reschedule";
import Paymentcard from "./_components/Paymentcard";
import SkeletonList from "./_components/SkeletonList";


const modalBoxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    minWidth: "200px"
};



function isReshedulable(booking: Booking): boolean {
    return booking.statusString == "Pending Payment";
}
function isCancelable(booking: Booking): boolean {
    return booking.statusString == "Paid";
}
function isRefundable(booking: Booking): boolean {
    return booking.statusString == "Service Completed";
}
function isFeedbackable(booking: Booking): boolean {
    return booking.statusString == "Completed";
}
function isCompleteable(booking: Booking): boolean {
    return false;
    //return booking.statusString == "Completed";
}
// Payment Expired ,Pending Payment ,Cancelled ,Paid ,Service Completed ,Completed , Refunded
function statusColor(status: string): string {
    switch (status) {
        case "Pending Payment":
            return "#FFD600"; // Yellow
        case "Paid":
            return "#12B837"; // Green
        case "Service Completed":
            return "#FF5858"; // Red
        case "Completed":
            return "#858585"; // Gray
        case "Payment Expired":
            return "#FF0000"; // Red
        case "Cancelled":
            return "#FF0000"; // Red
        case "Refunded":
            return "#3399FF"; // Blue
        default:
            return "#858585"; // Gray
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
        try     
        {
            toast.success("Booking has been cancelled successfully!");
            cancelBooking(id, reason);
            router.push('/bookingLoading');
        }
        catch (error) {
            toast.error("Error cancelling booking");
            console.error("Error fetching bookings:", error);
        }
    };
    const handleComplete = async (id: string) => {
        try     
        {
            toast.success("Booking has been completed successfully!");
            completeBooking(id);
            router.push('/bookingLoading');
        }
        catch (error) {
            toast.error("Error completing booking");
            console.error("Error fetching bookings:", error);
        }
    }


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
        [string, string, string,string,string] | [null, null, null, null,null]
    >([null, null, null, null,null]);
    // const [selectedTimeSlotId, setselectedTimeSlotId] = useState<string | null>(null);
    // const [selectedBookingIDReschedule, setselectedBookingIDReschedule] = useState<string | null>(null);
    const handleOpenReschedule = () => setOpenReschedule(true);
    const handleCloseReschedule = () => {
        setOpenReschedule(false);

        // setselectedTimeSlotId(null);
        // setSelectedBookingID(null);
    };
    function gotoFeedback() {
        
    }

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
                <Box sx={modalBoxStyle} >
                    {openReschedule && (
                        <RescheduleForm
                            bookingID={selectedReschedule[0]}
                            serviceID={selectedReschedule[1]}
                            timeslotID={selectedReschedule[2]}
                            startTime={selectedReschedule[3]}
                            endTime={selectedReschedule[4]}
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
                                
                                <div className={`flex flex-col font-medium text-[18px] xl:min-w-[170px] text-[${statusColor(booking.statusString)}]`}>
                                    {booking.statusString}
                                    {booking.statusString == "Pending Payment" && (
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
                                {isReshedulable(booking) && ( <button
                                    className="font-bold text-[16px] text-[#FFD600]"
                                    onClick={() => {
                                        setselectedReschedule([
                                            booking.bookingID,
                                            booking.serviceID,
                                            booking.timeslotID,
                                            booking.startTime,
                                            booking.endTime,
                                        ]);
                                        handleOpenReschedule();
                                    }}
                                >
                                    Reschedule
                                </button>)}

                                {isCancelable(booking) && (
                                    <button
                                        onClick={() =>
                                            handleCancel(booking.bookingID, "")
                                        }
                                    >
                                        <div className="font-bold text-[16px] ml-3 text-[#FF5858]">
                                            Cancel
                                        </div>
                                    </button>
                                )}
                                 {isCompleteable(booking) && (
                                     <button
                                     onClick={() =>
                                        handleComplete(booking.bookingID)
                                     }
                                 >
                                     <div className="font-bold text-[16px] ml-3 text-[#28a745]">
                                         Compelete
                                     </div>
                                 </button>
                                )
                                }
                            </div>
                            

                        <div className="flex xl:hidden pl-50 ">

                            {isRefundable(booking) && (
                            <button
                                    onClick={() => handleRefund(booking.bookingID)}
                                    >
                                    <div className="font-bold text-[16px]  text-[#3366ff]">
                                        Refund
                                    </div>

                                    </button>
                            )}


                            {isFeedbackable(booking) && (
                                 <button
                                 onClick={() =>router.push(`/profile/user/_/bookingHistory/${booking.bookingID}/feedback/${booking.serviceID}`)}
                                 >
                                    <div className="text-right ml-3 font-semibold text-[16px] text-[#858585]">
                                Write Feedback
                            </div>
                            </button>
                            )}

                            </div>
                        <div>
                            <div className="hidden xl:flex">

                                {isReshedulable(booking) && (
                                <button
                                    className="font-bold text-[16px] text-[#FFD600]"

                                
                                    onClick={() => {
                                        setselectedReschedule([
                                            booking.bookingID,
                                            booking.serviceID,
                                            booking.timeslotID,
                                            booking.startTime,
                                            booking.endTime,
                                        ]);
                                        handleOpenReschedule();
                                    }}
                                >
                                    Reschedule
                                </button>
                                )}

                                {isCancelable(booking) && (
                                <button
                                    onClick={() =>
                                        handleCancel(booking.bookingID, "")
                                    }
                                >
                                    <div className="font-bold text-[16px] ml-3 text-[#FF5858]">
                                        Cancel
                                    </div>
                                </button>
                                )}
                                {isCompleteable(booking) && (
                                     <button
                                     onClick={() =>
                                        handleComplete(booking.bookingID)
                                     }
                                 >
                                     <div className="font-bold text-[16px] ml-3 text-[#28a745]">
                                         Compelete
                                     </div>
                                 </button>
                                )
                                }
                                    
                            </div>

                            
                            <div className="hidden xl:flex">
                            {isRefundable(booking) && (
                            <button
                                    onClick={() => handleRefund(booking.bookingID)}
                                    >
                                    <div className="font-bold text-[16px]  text-[#3366ff]">
                                        Refund
                                    </div>

                                    </button>
                            )}
                            {isFeedbackable(booking) && (
                                <button
                                onClick={() =>router.push(`/profile/user/_/bookingHistory/${booking.bookingID}/feedback?service_id=${booking.serviceID}`)}
                                >
                                    <div className="text-right ml-3 font-semibold text-[16px] text-[#858585]">
                                Write Feedback
                            </div>
                            </button>
                            )}
                            
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
