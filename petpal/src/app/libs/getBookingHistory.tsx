export default async function getBookingHistory() {
    const response = await fetch(
        "http://localhost:8080/service/booking/all/user",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
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
