"use client"
import React from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { LoginApi } from '@/app/libs/user/userBackend';

export default function Profile() {
    const [isUser, SetisUser] = useState<boolean>(true)
    // useEffect(() => {

    //     const fetchCurrentEntity = async () => {
    //         const LogData = await LoginApi()
    //         setCookie("token", LogData?.data.AccessToken);
    //         console.log("logdata from login", LogData)
    //         setUserType(LogData?.data.logintype)
    //     };
    //     fetchCurrentEntity();
    //     const currentPage = usePathname();
    //     redirect(currentPage + "/0")
    // }, [])
    const currentPage = usePathname();
    redirect(currentPage + "/0")

    return <div>Profile</div>;
}
