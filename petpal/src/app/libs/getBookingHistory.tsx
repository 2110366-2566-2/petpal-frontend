export default async function getBookingHistory() {
    const response = await fetch(
        "http://localhost:8080/service/booking/all/user",
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
