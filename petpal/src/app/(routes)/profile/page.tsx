"use client"
import React from "react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { getCurrentEntity } from "@/app/libs/user/userBackend";
import { getCurrentEntityType } from "@/app/libs/currentEntiity/getCurrentEntityType";

export default function Profile() {
    // const currentPagePath: string = usePathname();
    const router = useRouter()
    const [accType, setAccType] = useState<string>("waiting")
    useEffect(() => {
        getCurrentEntity().then((Response) => {
            console.log(Response)
            setAccType(getCurrentEntityType(Response))
        })
    }, [])

    useEffect(() => {
        // console.log(accType)
        switch (accType) {
            case "waiting": {
                console.log("waiting")
                break
            }
            case "user": {
                console.log("user")
                router.push('/profile/user')
                break
            }
            case "svcp": {
                console.log("svcp")
                router.push("/profile/serviceProvider")
                break
            }
            case "undefined": {
                console.log("undefined")
                router.push('/login')
                break
            }
            default: {
                console.log("error")
                break
                // console.log(accType)
            }
        }
    }, [accType]);
    return <div>Profile</div>;
}
