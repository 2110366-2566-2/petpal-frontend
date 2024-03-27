"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import getSVCP from "@/app/libs/serviceProvider/getSVCP";
import { Service } from "@/app/_interface/service/service";
import { Convert, Svcp } from "@/app/_interface/svcp/svcp";
import ConfirmAppointmentButton from "@/app/(routes)/profile/_components/ConfirmAppointmentBtn";
export default function BookAppointment() {
    const params = useParams();
    console.log(params.email, params.ServiceId);
    const [selectedTimeslot, setSelectedTimeslot] = useState("");
    const [service, setService] = useState<Service | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    // useEffect(() => {
    //     const fetchServices = async () => {
    //         setLoading(true);
    //         try {
    //             if (
    //                 typeof params.email === "string" &&
    //                 typeof params.ServiceId === "string"
    //             ) {
    //                 const response = await getSVCP(params.email);
    //                 if (!response.ok)
    //                     throw new Error("Failed to fetch service details");
    //                 const data = await response.json();
    //                 const fetchedService = data.services.find(
    //                     (s: Service) => s.serviceID === params.ServiceId
    //                 );
    //                 if (!fetchedService) {
    //                     throw new Error("Service not found");
    //                 }
    //                 setService(
    //                     Convert.toService(JSON.stringify(fetchedService))
    //                 );
    //             } else {
    //                 throw new Error("Invalid URL parameters");
    //             }
    //         } catch (error: any) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchServices();
    // }, []);

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
                    console.log("Data fetched", data);
                    const specificService = data.services?.find(
                        (s) => s.serviceID === params.ServiceId
                    );
                    if (specificService) {
                        // setService(
                        //     Convert.toService(JSON.stringify(specificService))
                        // );
                        setService(specificService);
                    } else {
                        console.error("Specific service not found");
                        // Handle the case where the specific service isn't found
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

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    if (!service) return <div>Service not found.</div>;

    return (
        <main className="flex justify-center md:p-[20px]">
            <div className="w-full max-w-[1024px]">
                <div className="flex flex-col md:flex-row md:mt-[100px]">
                    <div className="w-full md:w-[550px] mr-[50px]">
                        <Image
                            src="/cat.png"
                            alt="PP"
                            width="800"
                            height={0}
                            className=""
                        />
                    </div>
                    <div className="flex flex-row md:flex-col justify-between md:justify-start p-5">
                        <div>
                            <h1 className="font-bold text-[24px]">
                                {service.serviceName}
                            </h1>
                            <h2 className="font-bold text-[#858585] text-[18px]">
                                Provider Name
                            </h2>
                        </div>
                        <div className="text-[#FF872F] font-black text-[24px] whitespace-nowrap">
                            4.1 ★
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row p-5 ">
                    <div>
                        <p className="font-medium text-[18px] md:max-w-[550px] md:mr-[20px]">
                            Grooming for dogs including wash, spa, trimming.
                            Inbox for any special inquiries. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Nulla
                            suscipit ipsum augue, vitae dignissim dui varius
                            vel. Phasellus ac leo diam. Nullam a lobortis massa.
                        </p>
                    </div>
                    <div className="mt-[150px] md:mt-[0px]">
                        <div className="flex flex-row justify-between">
                            <div className="font-medium text-[24px]">Feb 7</div>
                            <div className="pl-5 font-medium text-[24px]">
                                14.00 - 16.00
                            </div>
                        </div>
                        <div className="font-bold text-[24px] text-right my-[20px]">
                            500฿
                        </div>
                        <div className="text-center">
                            <ConfirmAppointmentButton name="Confirm Appointment" />
                        </div>
                    </div>
                </div>
            </div>
        </main>

        /* <main className="flex justify-center md:p-[20px]">
            <div className="w-full max-w-[1024px]">
                <div className="flex flex-col md:flex-row md:mt-[100px]">
                    <div className="w-full md:w-[550px] mr-[50px]">
                        <Image
                            src="/cat.png"
                            alt="PP"
                            width="800"
                            height={0}
                            className=""
                        />
                    </div>
                    <div className="flex flex-row md:flex-col justify-between md:justify-start p-5">
                        <div>
                            <h1 className="font-bold text-[24px]">
                                Grooming for Dogs
                            </h1>
                            <h2 className="font-bold text-[#858585] text-[18px]">
                                Provider Name
                            </h2>
                        </div>
                        <div className="text-[#FF872F] font-black text-[24px] whitespace-nowrap">
                            4.1 ★
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row p-5 ">
                    <div>
                        <p className="font-medium text-[18px] md:max-w-[550px] md:mr-[20px]">
                            Grooming for dogs including wash, spa, trimming.
                            Inbox for any special inquiries. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Nulla
                            suscipit ipsum augue, vitae dignissim dui varius
                            vel. Phasellus ac leo diam. Nullam a lobortis massa.
                        </p>
                    </div>
                    <div className="mt-[150px] md:mt-[0px]">
                        <div className="flex flex-row justify-between">
                            <div className="font-medium text-[24px]">Feb 7</div>
                            <div className="pl-5 font-medium text-[24px]">
                                14.00 - 16.00
                            </div>
                        </div>
                        <div className="font-bold text-[24px] text-right my-[20px]">
                            500฿
                        </div>
                        <div className="text-center">
                            <ConfirmAppointmentButton name="Confirm Appointment" />
                        </div>
                    </div>
                </div>
            </div>
        </main> */
    );
}
