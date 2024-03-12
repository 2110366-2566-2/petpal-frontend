type Booking = {
    serviceName: string;
    status: string; // Assuming 'completed' or other statuses
    providerName: string;
    date: string;
    time: string;
    price: number;
};
const bookings: Booking[] = [
    {
        serviceName: "Service Name 1",
        status: "completed",
        providerName: "Provider Name 1",
        date: "Feb 7",
        time: "14.00 - 16.00",
        price: 500,
    },
    {
        serviceName: "Service Name 2",
        status: "completed",
        providerName: "Provider Name 1",
        date: "Feb 7",
        time: "14.00 - 16.00",
        price: 500,
    },
    // Add more bookings as needed
];

export default function BookingHistory() {
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
                                {booking.status}
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
                                    {booking.providerName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="font-medium text-[24px] xl:mr-[20px]">
                            {booking.date}
                        </div>
                        <div className="font-medium text-[24px]">
                            {booking.time}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium text-[32px]">
                            {booking.price}฿
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
                            <div className="font-bold text-[16px] ml-3 text-[#FF5858]">
                                Cancel
                            </div>
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
