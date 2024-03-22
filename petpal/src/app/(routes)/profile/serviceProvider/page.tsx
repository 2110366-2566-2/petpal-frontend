'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getCurrentEntitySvcp } from "@/app/libs/user/getCurrentEntitySvcp";

export default function ServiceProviderprofile() {
    // const currentPage = usePathname();
    // redirect(currentPage + "/me")
    const router = useRouter()
    const [svcpId, setSvcpId] = useState<string>()
    useEffect(() => {
        getCurrentEntitySvcp().then((Response) => {
            // console.log(Response.id)
            setSvcpId(Response.SVCPID)
        })
    }, [])
    useEffect(() => {
        console.log(svcpId)
        switch (svcpId === undefined) {
            case false: {
                router.push('/profile/serviceProvider/' + svcpId)
                break
            }
            default: {
                console.log("error")
                break
            }
        }
    }, [svcpId])
    return (
        <h1>hello</h1>
    )
}