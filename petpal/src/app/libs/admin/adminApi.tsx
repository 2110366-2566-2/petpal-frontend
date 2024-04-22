import { API_URL } from "@/app/_constants/env";
export async function getIssueById(issueId: string) {
    try{
        const response = await fetch(`${API_URL}/issue/${issueId}`,{
            method:'GET',
            credentials:'include'
        })
        if(response.ok){
            return response.json()
        }
    }catch(err){
        console.log(err)
    }
}
export async function getBookingById(bookingId:string){
    try{
        const response = await fetch(`${API_URL}/service/booking/detail/admin`,{
            method:'POST',
            credentials:'include',
            body:JSON.stringify({
                bookingID : bookingId
            })
        })
        if(response.ok){
            return response.json()
        }
    }catch(err){
        console.log(err)
    }
}
export async function refundBooking(bookingId : string){
    try{
        const response = await fetch(`${API_URL}/service/booking/payment/refund`,{
            method:'POST',
            credentials:'include',
            body:JSON.stringify({
                bookingID : bookingId
            })
        })
        if(response.ok){
            return response.json()
        }
    }catch(err){
        console.log(err)
    }
}