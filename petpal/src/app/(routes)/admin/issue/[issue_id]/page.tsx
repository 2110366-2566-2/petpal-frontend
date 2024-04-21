'use client'
import { chatButtonFunction } from '@/app/(routes)/profile/_utils/chatButtonFunction';
import { getBookingById, getIssueById } from '@/app/libs/admin/adminApi';
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import { EntityType } from '@/app/_enum/currentEntity/EntityType';
export default function IssueId({ params }: { params: { issue_id: string } }) {
    const router = useRouter()
    type IssueType = {
        associatedBookingID: string,
        attachedImg: Array<string>,
        details: string,
        isResolved: boolean,
        issueDate: string,
        issueID: string,
        issueType: string,
        reporterID: string,
        reporterType: string,
        resolveDate: string,
        workingAdminID: string
    }
    type BookingType = {

        SVCPID: string,
        SVCPName: string,
        averageRating: number,
        bookingID: string,
        bookingTimestamp: string,
        cancel: {
            cancelBy: string,
            cancelReason: string,
            cancelStatus: boolean,
            cancelTimestamp: string
        },
        endTime: string,
        feedback: {
            content: string,
            feedbackID: string,
            rating: number
        },
        serviceDescription: string,
        serviceID: string,
        serviceImg: [
            number
        ],
        serviceName: string,
        startTime: string,
        status: {
            paymentStatus: boolean,
            paymentTimestamp: string,
            rescheduleStatus: boolean,
            svcpCompleted: boolean,
            svcpCompletedTimestamp: string,
            svcpConfirmed: boolean,
            svcpConfirmedTimestamp: string,
            userCompleted: boolean,
            userCompletedTimestamp: string,
            userRefund: boolean,
            userRefundTimestamp: string
        },
        timeslotID: string,
        totalBookingPrice: number,
        userID: string
    }
    const [issueId, setIssueId] = useState<string>(params.issue_id)
    const [Issue, setIssue] = useState<IssueType>()
    const [booking, setBooking] = useState<BookingType>()
    const [date, setDate] = useState<string>()
    const [stime, setStime] = useState<string>()
    const [etime, setEtime] = useState<string>()

    useEffect(() => {
        const fetchData = async () => {
            await getIssueById(issueId).then((response) => {
                setIssue(response)
            })
            // if(Issue){
            //     await getBookingById(Issue.associatedBookingID).then((response)=>{
            //         setBooking(response)
            //     })
            // }
        }
        fetchData()
    }, [])
    if (Issue && !booking) {
        const fetchData = async () => {
            await getBookingById(Issue.associatedBookingID).then((response) => {
                setBooking(response.result)

                const date = response.result.startTime.split('T')[0]
                let datestr = date.split('-')
                setDate(datestr[2] + '/' + datestr[1] + '/' + datestr[0])
                const startDate = new Date(response.result.startTime)
                const endDate = new Date(response.result.endTime)
                setStime((startDate.getHours() < 10 ? '0' : '') + startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes())
                setEtime((endDate.getHours() < 10 ? '0' : '') + endDate.getHours() + ':' + (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes())

            })
        }
        fetchData()
    }

    if (!Issue || !booking) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="mr-[31px] ml-[31px] md:mr-[134px] md:ml-[134px]">
            <div className="flex justify-end  h-32">

                <div className="mr-3 flex items-end ">
                    <button onClick={(event) => {
                        const speacial_tag: string = `<ISSUE_TAGE>${issueId}`
                        chatButtonFunction(Issue.workingAdminID, booking.userID, EntityType.ADMIN, EntityType.USER, speacial_tag, true)
                        router.push("/chat")
                    }}>
                        <ChatIcon />
                        <span className="ml-1">User</span>
                    </button>
                </div>
                <div className="mr-3 flex items-end ">
                    <button onClick={(event) => {
                        const speacial_tag: string = `<ISSUE_TAGE>${issueId}`
                        chatButtonFunction(Issue.workingAdminID, booking.SVCPID, EntityType.ADMIN, EntityType.SERVICE_PROVIDER, speacial_tag, true)
                        console.log(booking.SVCPID)
                        router.push("/chat")
                    }}>
                        <ChatIcon />
                        <span className="ml-1">Service Provider</span>
                    </button>
                </div>
            </div >
            <div className="md:flex mt-5 justify-between ">
                <div className="w-[100%] md:w-[471px] h-fit bg-[#F9F9F9] shadow-lg p-8 rounded-[20px] mb-5 md:mr-3">
                    <div className='flex justify-between mb-3'>
                        <div className='mr-2'>
                            <p className='text-[24px] font-bold'>{booking.serviceName}</p>
                            <p className='text-[18px] font-bold text-[#858585]'>{booking.SVCPName}</p>
                        </div>
                        <p className='text-[18px] text-[#12B837]'>{(booking.status.userCompleted && 'Complete') || 'Pending'}</p>
                    </div>
                    <div className='text-[24px] font-bold mb-3' >
                        <p className='text-[18px]'>User : {booking.userID}</p>
                    </div>
                    <div className='mb-3'>
                        <p className='text-[18px]'>{date} {stime} {etime}</p>
                    </div>
                    <div className='flex justify-between mb-3'>
                        {/* <p className='text-[32px]'>{booking.price}</p> */}
                        <div className='flex items-end'>
                            <button className='font-bold mr-3'>Refund</button>
                            <button className='text-[#FF5858] font-bold'>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] md:w-[626px] h-fit bg-[#F9F9F9] shadow-lg p-8 rounded-[20px] md:ml-3">
                    <div>
                        <p className='text-[24px] font-bold mb-3'>Issue Detail</p>
                    </div>
                    <div>
                        <p>{Issue.details}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}  