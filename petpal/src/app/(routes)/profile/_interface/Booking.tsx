export default interface Booking {
    bookingID: string;
    userID: string;
    SVCPID: string;
    serviceID: string;
    timeslotID: string;
    bookingTimestamp: string;
    totalBookingPrice: number;
    serviceName: string;
    SVCPName: string;
    startTime: string;
    endTime: string;
    cancel: {
        cancelStatus: boolean;
        cancelTimestamp: string;
        cancelReason: string;
        cancelBy: string;
    };
    status: {
        rescheduleStatus: boolean;
        paymentStatus: boolean;
        paymentTimestamp: string;
        svcpConfirmed: boolean;
        svcpConfirmedTimestamp: string;
        svcpCompleted: boolean;
        svcpCompletedTimestamp: string;
        userCompleted: boolean;
        userCompletedTimestamp: string;
    };
    statusString: string;
    feedback: {
        feedbackID: string;
        rating: number;
        content: string;
    };
}
