import { API_URL } from "@/app/_constants/env";

export default async function completeBooking(
    bookingID: string
) {
    const response = await fetch(
        API_URL + "/service/booking/complete/user",
        {
            method: "PATCH",
            credentials: "include",

            body: JSON.stringify({
                bookingID: bookingID,
            }),
        }
    );
    if (response.ok) {
        // Get bookings successful
        console.log("complete booking successful");
    } else {
        // Login failed
        console.error("complete booking failed");
    }

    return await response.json();
}
