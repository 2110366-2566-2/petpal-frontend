'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentEntityUser } from "@/app/libs/currentEntiity/getCurrentEntityUser";

export default function BookingLoading() {
  const router = useRouter()
    const [userId, setUserId] = useState<string>()
    useEffect(() => {
        getCurrentEntityUser().then((Response) => {
            setUserId(Response.id)
        })
    }, [])
    useEffect(() => {
        console.log(userId)
        switch (userId === undefined) {
            case false: {
                router.push('/profile/user/' + userId + '/bookingHistory')
                break
            }
            default: {
                console.log("error")
                break
            }
        }
    }, [userId])
  return (
    <div className='flex justify-center text-5xl pt-60'>BookingLoading...</div>
  )
}
