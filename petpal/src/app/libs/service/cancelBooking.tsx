import { API_URL } from "@/app/_constants/env";

export default async function cancelBooking(
    bookingID: string,
    cancelReason: string
) {
    const response = await fetch(
        API_URL + "/service/booking/cancel/user",
        {
            method: "PATCH",
            credentials: "include",

            body: JSON.stringify({
                bookingID: bookingID,
                cancelReason: cancelReason,
            }),
        }
    );
    if (response.ok) {
        // Get bookings successful
        console.log("Cancel booking successful");
    } else {
        // Login failed
        console.error("Cancel booking failed");
        console.log(response);
    }

    return await response.json();
}
