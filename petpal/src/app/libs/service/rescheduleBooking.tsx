export default async function rescheduleBooking(
    bookingID: string | null,
    timeslotID: string | null,
) {
    const response = await fetch("http://localhost:8080/service/booking/reschedule/user", {
        method: "PATCH",
        credentials:'include',
        body: JSON.stringify({
            "bookingID": bookingID,
            "timeslotID": timeslotID
        }),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error("failed to reschedule booking");
    }
}
