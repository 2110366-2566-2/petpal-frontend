import { API_URL } from "@/app/_constants/env";

export default async function getBookingHistory() {
    const response = await fetch(
        API_URL + "/service/booking/all/user",
        {
            method: "POST",
            credentials: "include",

            body: "{}",
        }
    );
    if (response.ok) {
        // Get bookings successful
        console.log("Get bookings successful");
    } else {
        // Login failed
        console.error("Get bookings failed");
        console.log(response);
    }

    return await response.json();
}
