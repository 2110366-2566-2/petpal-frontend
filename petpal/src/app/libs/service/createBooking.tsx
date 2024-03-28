export default async function createBooking(
    serviceID: string,
    timeslotID: string
) {
    const response = await fetch(
        "http://localhost:8080/service/booking/create",
        {
            method: "POST",
            credentials: "include",

            body: JSON.stringify({
                serviceID: serviceID,
                timeslotID: timeslotID,
            }),
        }
    );
    if (response.ok) {
        // Get bookings successful
        console.log("Create booking successful");
    } else {
        // Login failed
        console.error("Create booking failed");
        console.log(response);
    }

    return await response.json();
}
