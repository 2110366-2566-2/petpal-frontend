export async function getIssueById(issueId:string) {
    try{
        const response = await fetch(`http://localhost:8080/issue/${issueId}`,{
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
        const response = await fetch(`http://localhost:8080/service/booking/detail/admin`,{
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