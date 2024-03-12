"use client"
import React from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { LoginApi } from '@/app/libs/userBackend';

export default function Profile() {
    var UserType: string
    var SetUserType: (value: string) => void
    [UserType, SetUserType] = useState("")
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
