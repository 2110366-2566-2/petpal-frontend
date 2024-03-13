'use client'
import { orange } from '@mui/material/colors';
import { useState } from 'react';
import React from 'react'; 
import ReactStars from 'react-stars'
import { postFeedbackApi } from '@/app/libs/feedback';
export default function UserFeedbackPage(){

    const [content,setContent] = useState("")
    const [rating,setRating] = useState(0.0)

    //mock serviceID
    const [serviceid ,setServiceId] = useState("65f172b72d00a205a6f54672")

    const handleRating = (rating:any) =>{
        setRating(rating)
    }

    const postFeedback = async(content:string , rating:number , id:string) =>{
        return (await postFeedbackApi(id,content,rating))
    }

    return(
        <div className="items-center flex flex-col border-2 m-[50px]">
            <div className="m-auto mt-[30px] mb-[30px]">
            <span>Rating and Feedback this Booking</span>
            </div>
            <div className="jgrid grid-cols-1 content-start mb-[30px] grid-flow-row m-auto w-[90%]">
                <div className="grid grid-cols-1">
                    <span>Feedback :</span>
                    <textarea className="border-2 w-[100%]"
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
                    <button className='bg-orange' onClick={async()=>{postFeedback(content,rating,serviceid)}}>Submit</button>
                </div>
            </div>
        </div>
    )
}