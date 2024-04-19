import ChatIcon from '@mui/icons-material/Chat';
export default function IssueId(){

    const mockSvcp = {
        serviceName:"grooming dog",
        SVCPID:"Iron man",
        userID:"Captain america",
        date:"2024-04-30",
        startTime:"14:59",
        endTime:"19:59",
        status:"Complete",
        price:"500",
        issueDetail:"so my dog walker disappeared for half the session. can i get a refund? maybe ban that guy too"
    }

    return(
        <div className="mr-[134px] ml-[134px]">
        <div className="flex justify-end  h-32">
      
            <div className="mr-3 flex items-end ">
                <button>
                <ChatIcon/>
                <span className="ml-1">User</span>
                </button>
            </div>
            <div className="mr-3 flex items-end ">
                <button>
                <ChatIcon/>
                <span className="ml-1">Service Provider</span>
                </button>
            </div>
        </div>
        <div className="flex mt-5 justify-between ">
            <div className="w-[471px] h-fit bg-[#F9F9F9] shadow-lg p-8 rounded-[20px]">
                <div className='flex justify-between mb-3'>
                    <div>
                        <p className='text-[24px] font-bold'>{mockSvcp.serviceName}</p>
                        <p className='text-[18px] font-bold text-[#858585]'>{mockSvcp.SVCPID}</p>
                    </div>
                    <p className='text-[18px] text-[#12B837]'>{mockSvcp.status}</p>
                </div>
                <div className='text-[24px] font-bold mb-3' >
                    <p className='text-[18px]'>User : {mockSvcp.userID}</p>
                </div>
                <div className='mb-3'>
                    <p className='text-[18px]'>{mockSvcp.date} {mockSvcp.startTime} {mockSvcp.endTime}</p>
                </div>
                <div className='flex justify-between mb-3'> 
                    <p className='text-[32px]'>{mockSvcp.price}</p>
                    <div className='flex items-end'>
                        <button className='mr-3'>Refund</button>
                        <button className='text-[#FF5858] font-bold'>Delete</button>
                    </div>
                </div>
            </div>
            <div className="w-[626px] h-[167px] bg-[#F9F9F9] shadow-lg p-8 rounded-[20px]">
                <div> 
                    <p className='text-[24px] font-bold mb-3'>Issue Detail</p>
                </div>
                <div>
                    <p>{mockSvcp.issueDetail}</p>
                </div>
            </div>
        </div>
        </div>
    )  
}  