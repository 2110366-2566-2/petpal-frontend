export default async function getQRpayment(
    bookingID: string | null,
) {
    const response = await fetch("http://localhost:8080/service/booking/payment/qr", {
        method: "POST",
        body: JSON.stringify({
            bookingID: bookingID
        }),
    });
    if (response.ok) {
        console.log("Get QR successfully");
        const data = await response.json();
        return data;
    } else {
        console.error("Get QR failed");
    }
}
