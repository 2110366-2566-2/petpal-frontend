'use client'
import React from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';


export default async function UserProfile(){
    const currentPage = usePathname();
    redirect(currentPage+"/me")
    return (
        <h1>hello{currentPage}</h1>
    )
}