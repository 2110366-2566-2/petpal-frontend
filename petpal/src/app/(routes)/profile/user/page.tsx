'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { getCurrentEntity } from "@/app/libs/user/userBackend";
import { getCurrentEntityUser } from "@/app/libs/currentEntiity/getCurrentEntityUser";


export default function UserProfile() {
    const router = useRouter()
    const [userId, setUserId] = useState<string>()
    useEffect(() => {
        getCurrentEntityUser().then((Response) => {
            // console.log(Response.id)
            setUserId(Response.id)
        })
    }, [])
    useEffect(() => {
        console.log(userId)
        switch (userId === undefined) {
            case false: {
                router.push('/profile/user/' + userId)
                break
            }
            default: {
                console.log("error")
                break
            }
        }
    }, [userId])
    return (
        <h1>hello</h1>
    )
}