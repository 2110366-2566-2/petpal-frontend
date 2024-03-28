"use client";
import Image from "next/image";
import { useParams, useRouter} from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import getSVCP from "@/app/libs/serviceProvider/getSVCP";
import { Service } from "@/app/_interface/service/service";
import { Convert, Svcp } from "@/app/_interface/svcp/svcp";
import ConfirmAppointmentButton from "@/app/(routes)/profile/_components/ConfirmAppointmentBtn";
import createBooking from "@/app/libs/service/createBooking";

import {
    formatTimeToHourMinute,
    formatDate,
} from "@app/libs/service/formatDate";

export default function BookAppointment() {
    const params = useParams();
    console.log(params.email, params.ServiceId);
    const [selectedTimeslotId, setSelectedTimeslotId] = useState("");
    const [SVCPUsername, setSVCPUsername] = useState("Provider Name");
    const [service, setService] = useState<Service | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        const fetchServices = async () => {
            try {
                if (
                    typeof params.email === "string" &&
                    typeof params.ServiceId === "string"
                ) {
                    const jsonResponse = await getSVCP(params.email);
                    const jsonString = JSON.stringify(jsonResponse);
                    // const data = Convert.toSvcp(jsonResponse);
                    const data = Convert.toSvcp(jsonString);
                    if (data.SVCPUsername) {
                        setSVCPUsername(data.SVCPUsername);
                    }
                    console.log("Data fetched", data);
                    const specificService = data.services?.find(
                        (s) => s.serviceID === params.ServiceId
                    );
                    if (specificService) {
                        setService(specificService);
                    } else {
                        console.error("Specific service not found");
                    }
                } else {
                    throw new Error("Invalid URL parameters");
                }
            } catch (error: any) {
                console.error("Failed to fetch services:", error);
            }
        };
        fetchServices();
    }, [params.email, params.ServiceId]);

    const handleCreateBooking = async () => {
        const ServiceId =
            typeof params.ServiceId === "string"
                ? params.ServiceId
                : params.ServiceId?.[0];
    
        if (!params.ServiceId || !selectedTimeslotId) {
            toast.error("Please select a timeslot.");
            return;
        }
    
        try {
            const bookingResponse = await toast.promise(
                createBooking(ServiceId, selectedTimeslotId),
                {
                    loading: "Creating booking...",
                    success: <b>Booking created successfully!</b>,
                    error: <b>Error creating booking</b>
                }
            );
            console.log("Booking created successfully:", bookingResponse);
            router.push("/bookingLoading");
            // Handle success (e.g., display a success message or redirect)
        } catch (error) {
            console.error("Error creating booking:", error);
            // Handle error (e.g., display an error message)
        }
    };

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    if (!service) return <div>Service not found.</div>;

    return (
        <main className="flex justify-center md:p-[20px]">
            <div className="w-full max-w-[1024px] bg-[#f3f3f3] rounded-2xl shadow-lg p-5">
                <div className="flex flex-col md:flex-row md:mt-[40px]">
                    <div className="w-full md:w-[550px] mr-[50px]">
                        {service.serviceImg ? (
                            <Image
                                src={`data:image/png;base64,${service.serviceImg}`}
                                alt="service image"
                                width="800"
                                height={0}
                                className="rounded-lg shadow-xl"
                            />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex flex-row md:flex-col justify-between md:justify-start p-5">
                        <div>
                            <h1 className="font-bold text-[24px]">
                                {service.serviceName}
                            </h1>
                            <h2 className="font-bold text-[#858585] text-[18px]">
                                {SVCPUsername}
                            </h2>
                        </div>
                        <div className="text-[#FF872F] font-black text-[24px] whitespace-nowrap">
                            {service.averageRating} ★
                        </div>
                        <div className="hidden xl:flex">
                            <p className="font-medium text-[18px] md:max-w-[550px] md:mr-[20px]">
                                {service.serviceDescription}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row p-5 ">
                    <div className="xl:hidden">
                            <p className="font-medium text-[18px] md:max-w-[550px] md:mr-[20px]">
                                {service.serviceDescription}
                            </p>
                        </div>
                    <div className="mt-[150px] md:mt-[0px]">
                        <select
                            value={selectedTimeslotId}
                            onChange={(e) =>
                                setSelectedTimeslotId(e.target.value)
                            }
                            className="form-select block w-full mt-1 rounded-lg shadow-xl"
                        >
                            <option value="">Select a timeslot</option>
                            {service.timeslots?.map((timeslot) => (
                                <option
                                    key={timeslot.timeslotID}
                                    value={timeslot.timeslotID}
                                >
                                    {`${
                                        timeslot.startTime
                                            ? formatDate(timeslot.startTime)
                                            : "Unknown date"
                                    }: ${
                                        timeslot.startTime
                                            ? formatTimeToHourMinute(
                                                  timeslot.startTime
                                              )
                                            : "Unknown start time"
                                    } - ${
                                        timeslot.endTime
                                            ? formatTimeToHourMinute(
                                                  timeslot.endTime
                                              )
                                            : "Unknown end time"
                                    }`}
                                </option>
                            ))}
                        </select>
                        <div className="font-bold text-[24px] text-right my-[20px]">
                            {service.price}฿
                        </div>
                        <div className="text-center">
                            <ConfirmAppointmentButton
                                name="Confirm Appointment"
                                onClick={handleCreateBooking}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
