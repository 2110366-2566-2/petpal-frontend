export default function(){
    return(
        <div className="items-center flex flex-col border-2 m-[50px]">
            <div className="m-auto mt-[30px] mb-[30px]">
            <span>Rating and Feedback this Booking</span>
            </div>
            <div className="grid grid-cols-1 content-start mb-[30px]">
                <div>
                    <span>Date :</span>
                </div>
                <div>
                    <span>Time :</span>
                </div>
                <div>
                    <span>Service Type :</span>
                </div>
                <div>
                    <span>Service Provider :</span>
                </div>
                <div>
                    <span>Feedback :</span>
                </div>
            </div>
        </div>
    )
}