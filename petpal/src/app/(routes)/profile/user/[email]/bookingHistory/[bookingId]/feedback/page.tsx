'use client'
import { orange } from '@mui/material/colors';
import { useState } from 'react';
import React from 'react'; 
import ReactStars from 'react-stars'
export default function(){
    const [rating,setRating] = useState(0.0)
    const handleRating = (rating:any) =>{
        setRating(rating)
        console.log(rating)
    }
    return(
        <div className="items-center flex flex-col border-2 m-[50px]">
            <div className="m-auto mt-[30px] mb-[30px]">
            <span>Rating and Feedback this Booking</span>
            </div>
            <div className="jgrid grid-cols-1 content-start mb-[30px] grid-flow-row m-auto w-[90%]">
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
                <div className="grid grid-cols-1">
                    <span>Feedback :</span>
                    <textarea className="border-2 w-[100%]"></textarea>
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
                    <button className='bg-orange '>Submit</button>
                </div>
            </div>
        </div>
    )
}