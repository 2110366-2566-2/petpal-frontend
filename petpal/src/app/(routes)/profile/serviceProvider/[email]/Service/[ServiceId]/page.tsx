import Image from "next/image";
import defaultImage from "./cat.png";
import BasicButton from "@/app/_component/BasicButton";
import { useRouter } from "next/router";
import getSVCP from "@/app/libs/serviceProvider/getSVCP";
import ConfirmAppointmentButton from "@/app/(routes)/profile/_components/ConfirmAppointmentBtn";
export default function BookAppointment() {
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
        </main>
    );
}
