'use client'
import { getFeedbackApi } from '@/app/libs/feedback';
import { orange } from '@mui/material/colors';
import { useState,useEffect } from 'react';
import React from 'react'; 
import ReactStars from 'react-stars'

export default function FeedbackPage({serviceId}: {serviceId:string}){
    const [rating,setRating] = useState(0.0)
    const [feedback,setFeedback] = useState(Array<feedbackType>)

    useEffect(()=>{
        const fetchData = async() =>{
            const allFeedback = await getFeedbackApi('65f172b72d00a205a6f54672')
            setFeedback(allFeedback)
        }
        fetchData()
    },[])
    if(!feedback){
        return (<div>loading feedback....</div>)
    }else{
        console.log(feedback)
    }
    const handleRating = (rating:any) =>{
        setRating(rating)
        console.log(rating)
    }
    interface feedbackType{
        feedbackID:string,
        content:string,
        rating:number
    }

    return(
        <div className="items-center flex flex-col border-1 m-[50px] bg-[#DFDFDF] rounded-[10px]">
            <div className="m-auto mt-[30px] mb-[30px] ">
            <span>Rating and Feedback this Booking</span>
            </div>
            
            {
                feedback.map((component)=>
                <div className="jgrid grid-cols-1 content-start mb-[30px] grid-flow-row m-auto w-[90%]">
                    <div className='flex justify-between'>
                    <div className="grid grid-cols-1">
                        <span>Feedback :</span>
                        <span>{component.content}</span>
                    </div>
                    <div>
                    <span>Rating : {component.rating}</span>
                    </div>
                    </div>
                </div>
                )
            }
                
            
        </div>
    )
}