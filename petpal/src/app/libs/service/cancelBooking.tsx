export default async function cancelBooking(
    bookingID: string,
    cancelReason: string
) {
    const response = await fetch(
        "http://localhost:8080/service/booking/cancel/user",
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
