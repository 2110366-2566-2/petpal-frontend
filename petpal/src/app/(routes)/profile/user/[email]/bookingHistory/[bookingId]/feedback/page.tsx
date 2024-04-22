'use client'
import { orange } from '@mui/material/colors';
import { useState } from 'react';
import React from 'react'; 
import ReactStars from 'react-stars'
import { postFeedbackApi } from '@/app/libs/service/feedback';
import { useRouter,useSearchParams  } from "next/navigation";
import toast from "react-hot-toast";
export default function UserFeedbackPage(){

    const [content,setContent] = useState("")
    const [rating,setRating] = useState(0.0)
    const searchParams = useSearchParams()
    const serviceid = searchParams.get('service_id')
    const router = useRouter();
    //mock serviceID
    // const [serviceid ,setServiceId] = useState("65f172b72d00a205a6f54672")

    const handleRating = (rating:any) =>{
        setRating(rating)
    }

    const postFeedback = async(content:string , rating:number , id:string | null) =>{
        if(id == null){
            toast.error("Service ID is null")
            router.push("/")
            return
        }
        try{
            await postFeedbackApi(id,content,rating)
            toast.success("Feedback Submitted")
            
        // return (await postFeedbackApi(id,content,rating))
            router.push("/")
        }
        catch(e){
            toast.error("Failed to submit feedback")
        }
    }

    return(
        <div className="items-center flex flex-col m-[50px] rounded-[10px] bg-white border-[#D9d9d9] shadow-md">
            <div className="m-auto mt-[30px] mb-[30px] font-bold">
            <span>Rating and Feedback this Booking</span>
            </div>
            <div className="jgrid grid-cols-1 content-start mb-[30px] grid-flow-row m-auto w-[90%]">
                <div className="grid grid-cols-1 font-bold">
                    <span>Feedback :</span>
                    <textarea className="w-[100%] rounded-[10px] border-[#D9d9d9] border-2"
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                    ></textarea>
                </div>
                <div className='w-fit m-auto'>
                    <ReactStars
                        className='Rating'
                        count={5} 
                        size={60} 
                        color1 ={'#D9D9D9'}
                        edit
                        half
                        color2={'#FF872F'}
                        onChange={(e)=>{handleRating(e)}} /> 
                </div>
                <div>
                    <button className='bg-orange rounded-[10px] text-[18px] text-center p-[5px] text-[#fff]' onClick={async()=>{postFeedback(content,rating,serviceid)}}>Submit</button>
                </div>
            </div>
        </div>
    )
}